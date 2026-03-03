'use strict';

const axios = require('axios');

/**
 * Sends a test result summary to a Slack channel via Incoming Webhook.
 */
const SlackNotifier = {
  async send(results) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl.includes('YOUR') || process.env.SLACK_ENABLED !== 'true') {
      return;
    }

    const passed = results.totalPassed || 0;
    const failed = results.totalFailed || 0;
    const pending = results.totalPending || 0;
    const total = passed + failed + pending;
    const durationMin = ((results.totalDuration || 0) / 60000).toFixed(2);
    const channel = process.env.SLACK_CHANNEL || '#test-results';
    const emoji = failed > 0 ? ':warning:' : ':white_check_mark:';

    const text = `*Test Results: ${emoji}* | Total: ${total} | Passed: ${passed} | Failed: ${failed} | Pending: ${pending} | Duration: ${durationMin} min`;

    const payload = {
      channel,
      username: 'webhookbot',
      text,
      icon_emoji: ':information_source:',
    };

    try {
      const response = await axios.post(webhookUrl, payload);
      if (response.status !== 200) {
        console.error(`Slack notification failed: ${response.status}`);
      }
    } catch (err) {
      console.error(`Slack notification error: ${err.message}`);
    }
  },
};

module.exports = SlackNotifier;
