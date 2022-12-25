import { ArticleCard } from "../../components/article-card";
import { Layout } from "../../components/layout";
import { Header } from "../../components/sub-title-header";
import { article, tag } from "../../libs/cms-types";
import { listArticlesByTag, listTags, readTag } from "../../libs/microcms";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { FC } from "react";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const data = await listTags();
  const paths = data.map((tag) => `/tags/${tag.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
): Promise<GetStaticPropsResult<{ tag: tag; articles: Array<article> }>> => {
  if (!context.params) throw new Error("Not found: params");
  const { id } = context.params;
  const tag = await readTag(id);
  const articles = await listArticlesByTag(id);
  return {
    props: { tag: tag, articles: articles },
  };
};

const TagId: FC<{
  tag: tag;
  articles: Array<article>;
}> = ({ tag, articles }) => {
  return (
    <Layout subTitle={`# ${tag.name} - Tags`}>
      <Header
        subTitle={`# ${tag.name}`}
        path={[
          { href: "/", subTitle: "Home" },
          {
            href: "/tags",
            subTitle: "Tags",
          },
          {
            href: "/tags/" + tag.id,
            subTitle: "# " + tag.name,
          },
        ]}
      />
      <ul className="flex flex-wrap justify-between items-start">
        {articles.map((article, i) => (
          <li className="w-full md:w-[48%]">
            <ArticleCard data={article} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TagId;
