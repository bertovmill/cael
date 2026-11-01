import { defineTool } from "eve/tools";
import { z } from "zod";
import { postUrl, setPostStatus } from "../../../../lib/posts";

export default defineTool({
  description:
    "Mark a post published, or take it back to draft. Only publish when the user has explicitly said to publish this post in this conversation — drafting, editing, or 'looks good' is not a go-ahead.",
  inputSchema: z.object({
    slug: z.string().describe("The post's slug, from list_posts"),
    action: z.enum(["publish", "unpublish"]),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Dateline to show (YYYY-MM-DD). Defaults to the original publish date, or today for a first publish."),
  }),
  async execute({ slug, action, date }) {
    const post = await setPostStatus(slug, action === "publish" ? "published" : "draft", date);
    if (!post) return { ok: false as const, slug };
    return { ok: true as const, action, title: post.title, url: postUrl(post), publishedAt: post.publishedAt };
  },
  toModelOutput(output) {
    if (!output.ok) return { type: "text", value: `No post with slug "${output.slug}". Call list_posts.` };
    return {
      type: "text",
      value:
        output.action === "publish"
          ? `Published "${output.title}" (${output.publishedAt}): ${output.url}`
          : `"${output.title}" is back to a draft. Preview: ${output.url}`,
    };
  },
});
