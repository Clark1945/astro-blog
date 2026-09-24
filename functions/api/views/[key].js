// Cloudflare Pages Function — 讀取/累加單篇文章的瀏覽數。
//
// 需要在 Cloudflare Pages 專案設定一個名為 `POST_VIEWS` 的 KV Namespace binding
// （Production 與 Preview 環境都要設），詳見 README 或跟 Claude 要設定步驟。
//
// GET  /api/views/:key  -> 只讀取目前次數，不會累加
// POST /api/views/:key  -> 累加 1 次後回傳新的次數

export async function onRequestGet({ params, env }) {
  return jsonResponse(await readCount(env, params.key));
}

export async function onRequestPost({ params, env }) {
  const key = params.key;
  const next = (await readCount(env, key)) + 1;
  await env.POST_VIEWS.put(key, String(next));
  return jsonResponse(next);
}

async function readCount(env, key) {
  const value = await env.POST_VIEWS.get(key);
  const parsed = value ? parseInt(value, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function jsonResponse(views) {
  return new Response(JSON.stringify({ views }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}
