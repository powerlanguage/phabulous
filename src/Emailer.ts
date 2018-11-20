declare const SLACK_FORWARD_ADDRESS: string;
declare const GmailApp: any;

const MAX_SUBJECT_LENGTH = 200;

export default class Emailer {
  static send({ subject, body }: { subject: string; body: string }) {
    const sanitizedSubject =
      subject.length > MAX_SUBJECT_LENGTH
        ? `${subject.substr(MAX_SUBJECT_LENGTH - 1)}…`
        : subject;

    GmailApp.sendEmail(SLACK_FORWARD_ADDRESS, sanitizedSubject, body);
  }
}
