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
var ACTION_REGEX = /\[.*\] \[(.*)\]/
var TITLE_REGEX = /: (.*)/
var URL_REGEX = /REVISION DETAIL\s*(https:\/\/phabricator.*.com\/.*)/


function isBuildMessage(sender, body) {
  return sender === 'jenkins' || (sender === 'Phabricator' && body.indexOf('Harbormaster') > -1);
}

function sendNotificationEmail(subject, body) {
  GmailApp.sendEmail(SLACK_FORWARD_ADDRESS, subject, body);
}

function checkRegex(pattern, target, type) {
  var match = pattern.exec(target);
  if(match && match.length) {
    return match[1];
  } else {
    return "UNKNOWN " + type;
  }
}

function parsePhabricatorEmail(email) {
  var details = {};
  details.body = email.getBody();
  details.from = email.getFrom();
  details.subject = email.getSubject();
  details.diffOwner = checkRegex(OWNER_REGEX, details.body, 'OWNER')
  details.sender = checkRegex(SENDER_REGEX, details.from, 'SENDER');
  details.action = checkRegex(ACTION_REGEX, details.subject, 'ACTION');
  details.diffTitle = checkRegex(TITLE_REGEX, details.subject, 'TITLE');
  details.diffUrl = checkRegex(URL_REGEX, details.body, 'URL');
  details.isBuildMessage = isBuildMessage(details.sender, details.body);
  return details;
}

function phabulous() {
  var query = 'label:' + PHABRICATOR_GMAIL_LABEL +' AND label:unread';
  var threads = GmailApp.search(query, 0, BATCH_SIZE);

  threads.forEach(function(thread) {
    thread.getMessages().forEach(function(email) {
      if (email.isUnread()) {
        var details = parsePhabricatorEmail(email);

        // If I own this diff, notify me of everything (except builds)
        if(details.diffOwner === MY_LDAP) {
          if(!details.isBuildMessage) {
            var subject = details.sender + ' ' + details.action.toLowerCase() + ' ' + details.diffTitle;
            var body = details.diffUrl;
            sendNotificationEmail(subject, body);
          }
        } else {
          // If I don't own this diff, only notify me of requests for review
          if(details.action.indexOf('Request') > -1) {
            var subject = details.sender + ' requested your review on ' + details.diffTitle;
            var body = details.diffUrl;
            sendNotificationEmail(subject, body);
          }
        }
        // <ark as read so we don't process again
        email.markRead();
      }
    })
  });
}