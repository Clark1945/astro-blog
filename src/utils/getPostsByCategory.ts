import type { CollectionEntry } from "astro:content";
import type { Category } from "@/content.config";

/**
 * 只保留指定分類的文章，供分類列表、首頁、上下篇、RSS 共用，
 * 確保各入口不會跨主題。
 */
const getPostsByCategory = (
  posts: CollectionEntry<"blog">[],
  category: Category
) => posts.filter(({ data }) => data.category === category);

export default getPostsByCategory;
