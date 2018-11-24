import ParsedEmail from "./ParsedEmail";

declare const IGNORED: Array<string>;

const PHAB_TO_REGEX = /To: ([a-zA-Z0-9 \t,#-_]*)/;
const PHAB_CC_REGEX = /Cc: ([a-zA-Z0-9 \t,#-_]*)/;
const SENDER_REGEX = /^"?(\w*)/;
const ACTIONS_REGEX = /([\s\S]*?)[\n\r][\n\r]/;
const TITLE_REGEX = /: (.*)/;
const URL_REGEX = /REVISION DETAIL\s*(https:\/\/phabricator.*.com\/.*)/;

const TRACKED_ACTIONS = [
  "requested review",
  "added a comment",
  "added inline comments",
  "accepted this revision",
  "requested changes to this revision"
];

export default class PhabricatorEmail implements ParsedEmail {
  static parseEmail(email) {
    if (email.getFrom().indexOf("phabricator@internal.pinterest.com") !== -1) {
      return new PhabricatorEmail(email);
    }

    return null;
  }

  body: string;
  from: string;
  subject: string;
  phabricatorTo: string;
  phabricatorCC: string;
  diffOwner: string;
  sender: string;
  diffTitle: string;
  diffUrl: string;
  shouldIgnore: boolean;
  actions: string;
  formattedActions: string;

  constructor(email) {
    this.body = email.getBody();
    this.from = email.getFrom();
    this.subject = email.getSubject();

    this.phabricatorTo = this.convertRecipientsStringToArray(
      this.checkRegex(PHAB_TO_REGEX, this.body, "PHAB TO:")
    );
    this.phabricatorCC = this.convertRecipientsStringToArray(
      this.checkRegex(PHAB_CC_REGEX, this.body, "PHAB CC:")
    );

    // This whole thing works because of the below assumption that the first
    // person in the To: field is the diff author.
    this.diffOwner = this.phabricatorTo[0];

    this.sender = this.checkRegex(SENDER_REGEX, this.from, "SENDER");
    this.diffTitle = this.checkRegex(TITLE_REGEX, this.subject, "TITLE");
    this.diffUrl = this.checkRegex(URL_REGEX, this.body, "URL");
    this.shouldIgnore = this.shouldIgnoreAnyRecipient(this.phabricatorTo);

    this.actions = this.filterActions(
      this.checkRegex(ACTIONS_REGEX, this.body, "ACTIONS"),
      this.sender
    );
    this.formattedActions = this.formatActions(this.actions);
  }

  get isBuildMessage() {
    return (
      this.sender === "jenkins" ||
      (this.sender === "Phabricator" && this.body.indexOf("Harbormaster") > -1)
    );
  }

  checkRegex(pattern, target, type) {
    var match = pattern.exec(target);
    if (match && match.length) {
      return match[1];
    } else {
      return "UNKNOWN " + type;
    }
  }

  // Takes multiple lines of actions and filter to ones that begin with the
  // sender's name and that we track. This allows the message sent to slack to be
  // more descriptive.
  filterActions(actions, sender) {
    return actions
      .split("\n")
      .filter(action => action.indexOf(sender) === 0)
      .reduce((acc, action) => {
        TRACKED_ACTIONS.forEach(trackedAction => {
          if (action.indexOf(trackedAction) !== -1) {
            // TODO: use a string map for more naturally readable actions
            acc.push(trackedAction);
          }
        });

        return acc;
      }, []);
  }

  formatActions(actions) {
    if (actions && actions.length > 0) {
      const vistedActions = {};

      return actions
        .filter(action => {
          if (vistedActions[action]) {
            return false;
          }

          vistedActions[action] = true;
          return true;
        })
        .join(", ")
        .toLowerCase()
        .replace(/,(?=[^,]*$)/, " and");
    } else {
      return "";
    }
  }

  convertRecipientsStringToArray(phabString) {
    return phabString
      .trim()
      .split(",")
      .map(function(item) {
        return item.trim();
      });
  }

  shouldIgnoreAnyRecipient(recipients) {
    for (var i = 0; i < IGNORED.length; i++) {
      if (recipients.indexOf(IGNORED[i]) > -1) {
        return true;
      }
    }
    return false;
  }
}
