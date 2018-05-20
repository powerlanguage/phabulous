/*
A google script that filters Phabricator emails and notifies you via Slack of the important ones.

To Use:
- Set Phabricator emails to plaintext
- Add a native gmail filter to label and archive all incoming phabricator emails
- Update the first section of the script with the relevant info
- Add a trigger to run this script every minute

*/

/* --- Update this section --- */

// Your slack email forward
// https://get.slack.help/hc/en-us/articles/206819278-Send-emails-to-Slack
var SLACK_FORWARD_ADDRESS = 'FILL_ME_IN';

// Your username
var MY_LDAP = 'FILL_ME_IN';

// The native gmail label you created
var PHABRICATOR_GMAIL_LABEL = 'FILL_ME_IN';

// How many conversations should gmail fetch at a time
var BATCH_SIZE = 10;

/* --- Leave this section --- */

var OWNER_REGEX = /To:\s([a-zA-Z0-9]*)/
var SENDER_REGEX = /^"?(\w*)/
var ACTIONS_REGEX = /([\s\S]*?)[\n\r][\n\r]/
var TITLE_REGEX = /: (.*)/
var URL_REGEX = /REVISION DETAIL\s*(https:\/\/phabricator.*.com\/.*)/


function isBuildMessage(sender, body) {
  return sender === 'jenkins' || (sender === 'Phabricator' && body.indexOf('Harbormaster') > -1);
}

function sendNotificationEmail(email) {
  GmailApp.sendEmail(SLACK_FORWARD_ADDRESS, email.subject, email.body);
}

function checkRegex(pattern, target, type) {
  var match = pattern.exec(target);
  if(match && match.length) {
    return match[1];
  } else {
    return "UNKNOWN " + type;
  }
}

var TRACKED_ACTIONS = [
  "requested review",
  "added a comment",
  "added inline comments",
  "accepted this revision",
  "requested changes to this revision",
];

// Takes multiple lines of actions and filter to ones that begin with the
// sender's name and that we track. This allows the message sent to slack to be
// more descriptive.
function filterActions(actions, sender) {
  return actions.split('\n')
    .filter(function(action){
      return action.indexOf(sender) === 0;
    })
    .reduce(function(acc, action){
      TRACKED_ACTIONS.forEach(function(trackedAction){
        if (action.indexOf(trackedAction) > -1) {
          // TODO: use a string map for more naturally readable actions
          acc.push(trackedAction);
        }
      })
      return acc
    }, [])
}

function parsePhabricatorEmail(email) {
  var details = {};
  details.body = email.getBody();
  details.from = email.getFrom();
  details.subject = email.getSubject();
  details.diffOwner = checkRegex(OWNER_REGEX, details.body, 'OWNER')
  details.sender = checkRegex(SENDER_REGEX, details.from, 'SENDER');
  details.diffTitle = checkRegex(TITLE_REGEX, details.subject, 'TITLE');
  details.diffUrl = checkRegex(URL_REGEX, details.body, 'URL');
  details.isBuildMessage = isBuildMessage(details.sender, details.body);
  details.actions = filterActions(checkRegex(ACTIONS_REGEX, details.body, 'ACTIONS'), details.sender);
  details.formattedActions = formatActions(details.actions);
  return details;
}

function formatActions(actions) {
  if(actions && actions.length > 0) {
    return actions.join(', ').toLowerCase().replace(/,(?=[^,]*$)/, ' and');
  } else {
    return '';
  }
}

function phabulous() {
  var query = 'label:' + PHABRICATOR_GMAIL_LABEL +' AND label:unread';
  var threads = GmailApp.search(query, 0, BATCH_SIZE);

  var outgoingEmail = {
    subject: '',
    body: '',
  }

  threads.forEach(function(thread) {
    thread.getMessages().forEach(function(email) {
      if (email.isUnread()) {
        var details = parsePhabricatorEmail(email);

        // If I own this diff, notify me of everything (except builds)
        if(details.diffOwner === MY_LDAP) {
          if(!details.isBuildMessage) {
            outgoingEmail.subject = details.sender + ' ' + details.formattedActions + ': ' + details.diffTitle;
            outgoingEmail.body = details.diffUrl;
          }
        } else {
          // If I don't own this diff, only notify me of requests for review
          if(details.formattedActions.indexOf('requested review') > -1) {
            outgoingEmail.subject = details.sender + ' ' + details.formattedActions + ': ' + details.diffTitle;
            outgoingEmail.body = details.diffUrl;
          }
        }

        if(outgoingEmail.subject && outgoingEmail.body) {
          sendNotificationEmail(outgoingEmail);
        }

        // mark as read so we don't process again
        email.markRead();
      }
    })
  });
}