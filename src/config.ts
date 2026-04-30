type SocialObjects = {
  name: string;
  href: string;
  linkTitle: string;
  active: boolean;
}[];

export const SITE = {
  website: "https://blog.clarkliu.com", // replace this with your deployed domain
  author: "Clark Liu",
  profile: "https://clarkliu.com",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    url: "https://github.com/Clark1945/astro-blog",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Taipei", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Clark1945",
    linkTitle: `${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/clark-liu-b48740253/", // 填入你的 LinkedIn
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "",
    linkTitle: "",
    active: false, // 不用的設 false
  },
  // 其他 social...
];
