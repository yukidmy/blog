import type { NextPage } from "next";
import Head from "next/head";

export const MyHead: NextPage<{
  subTitle: string;
  description?: string;
  image?: string;
}> = ({ subTitle, description, image }) => {
  const siteName = "#ゆのろぐ";
  const title = subTitle ? `${subTitle} | ${siteName}` : siteName;
  const desc = description ? description : "Yuki Y's blog";

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.svg" />
      <meta name="description" content={desc} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta name="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  );
};
