import Fetcher from "./Fetcher";
import EmailParser from "./EmailParser";
import EmailHandler from "./EmailHandler";
import PhabricatorEmail from "./emails/PhabricatorEmail";
import notifyForMyDiffsHandler from "./handlers/notifyForMyDiffsHandler";
import notifyForRequestForReview from "./handlers/notifyForRequestForReview";

export const phabulous = () => {
  // Create a parser and add the email types we'd like to support. For now,
  // that's just Phabricator emails.
  const emailParser = new EmailParser();
  emailParser.addParser(PhabricatorEmail.parseEmail);

  // Create a handler and add some Phabricator email handlers.
  const emailHandler = new EmailHandler();
  emailHandler.addHandler(notifyForMyDiffsHandler);
  emailHandler.addHandler(notifyForRequestForReview);

  // Fetch mail from Gmail and proccess it into new messages.
  Fetcher.fetchEmailThreads().forEach(thread => {
    thread
      .getMessages()
      .filter(email => email.isUnread())
      .forEach(email => {
        const parsedEmail = emailParser.parseEmail(email);
        emailHandler.handleEmail(parsedEmail);
        email.markRead();
      });
  });
};
