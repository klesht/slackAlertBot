const axios = require("axios");

const slackWebHookUrl = process.env.SlackWebhookUrl;

function sendSlackMessage(slackMessage) {
  axios.post(slackWebHookUrl, slackMessage);
};

module.exports = sendSlackMessage;
