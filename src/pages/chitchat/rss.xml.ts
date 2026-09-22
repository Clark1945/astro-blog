import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("chitchat", ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() -
      new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime()
  );

  return rss({
    title: `${SITE.author} - 生活`,
    description: "關於生活與思考的隨筆，隨意聊聊。",
    site: new URL("/chitchat/", SITE.website).href,
    items: sortedPosts.map(({ data, id }) => ({
      link: `/chitchat/${id}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
