import ParsedEmail from "./emails/ParsedEmail";

type EmailParserFunc = (email) => ParsedEmail | null;

export default class EmailParser {
  parsers: Array<EmailParserFunc> = [];

  addParser(parser: EmailParserFunc) {
    this.parsers.push(parser);
  }

  parseEmail(email): ParsedEmail | null {
    for (let i = 0; i < this.parsers.length; ++i) {
      const parser = this.parsers[i];
      const parsedEmail = parser(email);

      if (parsedEmail) {
        return parsedEmail;
      }
    }

    return null;
  }
}
