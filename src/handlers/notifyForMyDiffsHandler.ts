import PhabricatorEmail from "../emails/PhabricatorEmail";
import Emailer from "../Emailer";

declare const MY_LDAP: string;

export default email => {
  // If I own this diff, notify me of everything (except builds).
  if (
    email instanceof PhabricatorEmail &&
    email.diffOwner === MY_LDAP &&
    !email.isBuildMessage
  ) {
    Emailer.send({
      subject: `${email.sender} ${email.formattedActions}: ${email.diffTitle}`,
      body: email.diffUrl
    });

    return true;
  }

  return false;
};
