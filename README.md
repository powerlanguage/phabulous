# Phabulous

A google script that filters Phabricator emails and notifies you via Slack of the important ones.

To Use:
- Set Phabricator emails to plaintext
- Add a native gmail filter to label and archive all incoming phabricator emails
- Update the first section of the script with the relevant info
- Add a trigger to run this script every minute

**Warning:** This script is super brittle and relies heavily on Phabricator email formatting not changing

- Uses the google script gmail api: https://developers.google.com/apps-script/reference/gmail/
- Modified from: https://github.com/paoloantinori/gmail-labeler