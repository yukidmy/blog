import { ArticleDate } from "../components/article-date";
import { Layout } from "../components/layout";
import { MicroCmsImage } from "../components/microcms-image";
import {
  SquareIconButton,
  SquareElementButton,
} from "../components/square-button";
import { article } from "../libs/cms-types";
import { listArticles } from "../libs/microcms";
import { encodedUrl } from "../libs/url-util";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "highlight.js/styles/base16/dracula.css";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const data = await listArticles();
  const paths = data.map((article) => `/${article.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
): Promise<
  GetStaticPropsResult<{
    article: article;
    nextId: string | null;
    prevId: string | null;
  }>
> => {
  if (!context.params) throw new Error("Not found: params");
  const { id } = context.params;
  const data = await listArticles();
  const index = data.findIndex((d) => d.id === id);
  if (index < 0) throw new Error("Not found: article");
  return {
    props: {
      article: data[index],
      nextId: index === 0 ? null : data[index - 1].id,
      prevId: index === data.length - 1 ? null : data[index + 1].id,
    },
  };
};

const ArticleId: NextPage<{
  article: article;
  nextId: string;
  prevId: string;
}> = ({ article, nextId, prevId }) => {
  useEffect(() => {
    // Add a link to the external Twitter script file:
    const twitterScript = document.createElement("script");
    twitterScript.setAttribute(
      "src",
      "https://platform.twitter.com/widgets.js"
    );
    twitterScript.setAttribute("async", "true");
    const tweetElement = document.getElementsByClassName("twitter-tweet")[0];
    // Only add the Twitter script if there is a Tweet to embed:
    tweetElement ? tweetElement.appendChild(twitterScript) : null;

    // Add a link to the external Instagram script file:
    const instagramScript = document.createElement("script");
    instagramScript.setAttribute("src", "https://www.instagram.com/embed.js");
    instagramScript.setAttribute("async", "true");
    const instaElement = document.getElementsByClassName("instagram-media")[0];
    // Only add the Instagram  script if there is an Instagram Post to embed:
    instaElement ? instaElement.appendChild(instagramScript) : null;
  }, [article.content]);

  return (
    <Layout
      subTitle={article.title}
      description={article.summary.slice(0, 150) + " ..."}
      image={article.eyecatch.url}
    >
      <div className="w-full mb-14">
        <div className="text-center">
          <Link href={`/${article.id}`}>
            <h1>{article.title}</h1>
          </Link>
        </div>
        <div className="my-5">
          <div className="flex flex-wrap gap-x-5 justify-center items-center">
            <span className="my-1">
              <ArticleDate data={article} />
            </span>
            <ul className="my-1 flex flex-wrap gap-x-3 justify-center">
              {article.tags.map((tag) => (
                <li key={`tags/${tag.id}`}>
                  <Link className="text-teal-500" href={`/tags/${tag.id}`}>
                    <FontAwesomeIcon icon={faHashtag} className="mr-1" />
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative w-full my-10 aspect-video">
          <Link href={`/${article.id}`}>
            <MicroCmsImage
              src={article.eyecatch.url}
              alt="cover image"
              loading="eager"
            />
          </Link>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: `${article.content}`,
          }}
        />
      </div>
      <ul className="flex justify-center items-center">
        <li key="x-twitter">
          <SquareIconButton
            textColor="text-slate-900"
            borderColor="border-transparent"
            focus={false}
            href={encodedUrl(
              "https://x.com/intent/tweet/",
              `${article.title} | #ゆのろぐ`,
              `https://blog.yukidmy.com/${article.id}`
            )}
            icon={faXTwitter}
            label="Share on X"
          />
        </li>
      </ul>
      <nav className="mt-5 mb-10 flex justify-between items-center">
        {nextId ? (
          <SquareElementButton
            textColor="text-slate-900"
            borderColor="border-transparent"
            focus={false}
            href={`/${nextId}`}
            label="Next"
          >
            <p>
              <FontAwesomeIcon icon={faAngleLeft} /> Next
            </p>
          </SquareElementButton>
        ) : null}
        <div className="flex-grow"></div>
        {prevId ? (
          <SquareElementButton
            textColor="text-slate-900"
            borderColor="border-transparent"
            focus={false}
            href={`/${prevId}`}
            label="Prev"
          >
            <p>
              Prev <FontAwesomeIcon icon={faAngleRight} />
            </p>
          </SquareElementButton>
        ) : null}
      </nav>
    </Layout>
  );
};

export default ArticleId;
