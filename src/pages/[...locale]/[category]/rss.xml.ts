import rss from "@astrojs/rss";
import getSortedPosts from "@/utils/getSortedPosts";
import getPostsByCategory from "@/utils/getPostsByCategory";
import { SITE } from "@/config";
import { CATEGORIES, type Category } from "@/content.config";
import { getRelativeLocalePath, translateFor } from "@/i18n/utils";
import type { APIContext } from "astro";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { getPostsGroupedByLocale } from "@/utils/posts";
import { getPath } from "@/utils/getPath";

export async function getStaticPaths() {
  return SUPPORTED_LOCALES.flatMap(locale =>
    CATEGORIES.map(category => ({
      params: {
        locale: locale === DEFAULT_LOCALE ? undefined : locale,
        category,
      },
    }))
  );
}

export async function GET(context: APIContext) {
  const { locale = DEFAULT_LOCALE, category } = context.params as {
    locale?: (typeof SUPPORTED_LOCALES)[number];
    category: Category;
  };

  const t = translateFor(locale);

  const postsByLocale = await getPostsGroupedByLocale({
    allowedLocales: SUPPORTED_LOCALES,
  });
  const sortedPosts = getSortedPosts(
    getPostsByCategory(postsByLocale[locale] || [], category)
  );

  return rss({
    title: `${t("site.title")} - ${t(category)}`,
    description: t(`${category}.desc` as const),
    site: new URL(getRelativeLocalePath(locale, `/${category}/`), SITE.website)
      .href,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getRelativeLocalePath(locale, getPath(id, filePath)),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
