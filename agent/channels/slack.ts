import { defaultSlackAuth, slackChannel } from "eve/channels/slack";
import { connectSlackCredentials } from "@vercel/connect/eve";

// Only the owner's Slack user id reaches the agent. Unset means nobody does.
const OWNER_ID = process.env.SLACK_OWNER_ID?.trim() ?? "";

export default slackChannel({
  credentials: connectSlackCredentials(process.env.SLACK_CONNECTOR ?? "slack/cael"),
  threadContext: { since: "last-agent-reply" },
  onAppMention: (ctx, message) => {
    if (!OWNER_ID || message.author?.userId !== OWNER_ID) return null;
    return { auth: defaultSlackAuth(message, ctx) };
  },
  onDirectMessage: (ctx, message) => {
    if (!OWNER_ID || message.author?.userId !== OWNER_ID) return null;
    return { auth: defaultSlackAuth(message, ctx) };
  },
});
