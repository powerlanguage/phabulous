import ParsedEmail from "./emails/ParsedEmail";

type EmailHandlerFunc = (email) => boolean;

export default class EmailHandler {
  handlers: Array<EmailHandlerFunc> = [];

  addHandler(handler: EmailHandlerFunc) {
    this.handlers.push(handler);
  }

  handleEmail(email): ParsedEmail | null {
    for (let i = 0; i < this.handlers.length; ++i) {
      const handler = this.handlers[i];
      const handled = handler(email);

      if (handled) {
        return;
      }
    }
  }
}
