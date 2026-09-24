/**
 * 產生 ViewCounter 用的瀏覽數 key。
 * blog 文章用檔名（不含語系資料夾）當 key，讓同一篇文章的三語版本
 * 共用同一個瀏覽數；chitchat 本來就沒有語系子資料夾，直接用 id。
 */
export const getBlogViewKey = (id: string) => `blog:${id.split("/").pop()}`;

export const getChitchatViewKey = (id: string) => `chitchat:${id}`;
