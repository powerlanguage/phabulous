import PhabricatorEmail from "../emails/PhabricatorEmail";
import Emailer from "../Emailer";

declare const MY_LDAP: string;

export default email => {
  // If I don't own this diff and recipient is not ignored, notify me of
  // requests for review.
  if (
    email instanceof PhabricatorEmail &&
    email.diffOwner !== MY_LDAP &&
    !email.shouldIgnore &&
    email.formattedActions.indexOf("requested review") > -1
  ) {
    Emailer.send({
      subject: `${email.sender} ${email.formattedActions}: ${email.diffTitle}`,
      body: email.diffUrl
    });

    return true;
  }

  return false;
};
