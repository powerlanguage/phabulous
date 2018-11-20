declare const PHABRICATOR_GMAIL_LABEL: string;
declare const BATCH_SIZE: string;
declare const GmailApp: any;

export default class Fetcher {
  static fetchEmailThreads() {
    const query = "label:" + PHABRICATOR_GMAIL_LABEL + " AND label:unread";
    return GmailApp.search(query, 0, BATCH_SIZE);
  }
}
