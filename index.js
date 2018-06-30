const getPullRequests = require('./src/get_pull_requests');
const buildSlackMessage = require('./src/build_slack_message');
const sendSlackMessage = require('./src/send_slack_message');

function scheduledSlackMessage() {
  getPullRequests()
    .then(pullRequests => buildSlackMessage(pullRequests))
    .then(slackMessage => sendSlackMessage(slackMessage))
}

exports.handler = scheduledSlackMessage;
