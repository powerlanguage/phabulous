# Phabulous

Phabulous is a Google Script that intercepts incoming Phabricator emails and routes them to Slack instead.

To use:

1. Set Phabricator emails to plaintext.
2. Add a native Gmail filter to label and archive all incoming phabricator emails.
3. Copy the script in dist/main.js into a new [Google Script project](https://developers.google.com/apps-script/guides/projects) and edit the config section at the top of the script.
4. Add a trigger to call the "run" function in this script every minute.

To develop:

1. Run `yarn` or `npm` in the root folder.
2. Run `yarn build` or `yarn watch` to run webpack.
3. To parse new emails, add parsers in the src/emails folder and add them to the email parser in index.ts.
4. To send new messages to slack, add handlers in the src/handlers folder and add them to the email handler in index.ts.

**Warning:** This script is super brittle and relies heavily on Phabricator email formatting not changing.

- Uses the Google Script Gmail API: https://developers.google.com/apps-script/reference/gmail/
- Original concept from: https://github.com/paoloantinori/gmail-labeler
- Build env adapted from: https://github.com/facebook/create-react-app
