import { twilioChannel } from "eve/channels/twilio";

// Renders a pending approval/question as a plain-text SMS so the user actually
// sees it — without this, the session parks silently at `input.requested` and
// every subsequent text gets swallowed waiting for an answer nobody knew to give.
function formatInputRequest(request: {
  prompt: string;
  options?: readonly { id: string; label: string }[];
  allowFreeform?: boolean;
}): string {
  const lines = [request.prompt];
  if (request.options && request.options.length > 0) {
    lines.push("");
    lines.push(`Reply: ${request.options.map((o) => o.label).join(" / ")}`);
  } else if (request.allowFreeform) {
    lines.push("");
    lines.push("Reply to answer.");
  }
  return lines.join("\n");
}

export default twilioChannel({
  // Only the owner's number(s) reach the agent, which has every tool over their
  // data. Comma-separated E.164 numbers; with none set, nobody gets through.
  allowFrom: async () => (process.env.TWILIO_ALLOW_FROM ?? "").split(",").map((n) => n.trim()).filter(Boolean),
  messaging: {
    // The Twilio number that sends outbound SMS replies.
    from: process.env.TWILIO_FROM_NUMBER ?? "",
  },
  events: {
    async "input.requested"(data, channel) {
      const text = data.requests.map(formatInputRequest).join("\n\n");
      if (text) await channel.twilio.sendMessage(text);
    },
  },
});
