'use strict';

const axios = require('axios');

/**
 * Sends a test result summary to a Slack channel via Incoming Webhook.
 */
const SlackNotifier = {
  async send(total, passed, failed, skipped, durationMs) {
    const webhookUrl =
      process.env.SLACK_WEBHOOK_URL || (process.env.SLACK_ENABLED === 'true' ? '' : null);

    if (!webhookUrl || webhookUrl.includes('YOUR') || process.env.SLACK_ENABLED !== 'true') {
      return;
    }

    const emoji = failed > 0 ? ':warning:' : ':white_check_mark:';
    const durationMin = (durationMs / 60000).toFixed(2);
    const channel = process.env.SLACK_CHANNEL || '#test-results';

    const text = `*Test Results: ${emoji}* | Total: ${total} | Passed: ${passed} | Failed: ${failed} | Skipped: ${skipped} | Duration: ${durationMin} min`;

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
