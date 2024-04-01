import { ArticleCard } from "../../components/article-card";
import { Layout } from "../../components/layout";
import { Pagination, ARTICLES_PER_PAGE } from "../../components/pagination";
import { article } from "../../libs/cms-types";
import { listArticles } from "../../libs/microcms";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { NextPage } from "next";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const articles = await listArticles();
  const max_page = Math.ceil((articles.length + 1) / ARTICLES_PER_PAGE);
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths =
    max_page > 1 ? range(2, max_page).map((repo) => `/pages/${repo}`) : [];
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<
  GetStaticPropsResult<{
    id: string;
    articles: Array<article>;
    totalCount: number;
  }>
> => {
  if (!context.params) throw new Error("Not found: params");
  const { id } = context.params;
  const articles = await listArticles(
    (+id - 1) * ARTICLES_PER_PAGE - 1,
    ARTICLES_PER_PAGE,
  );
  const totalCount = await (await listArticles()).length;
  return {
    props: {
      id: id,
      articles: articles,
      totalCount: totalCount,
    },
  };
};

const PageId: NextPage<{
  id: string;
  articles: Array<article>;
  totalCount: number;
}> = ({ id, articles, totalCount }) => {
  return (
    <Layout subTitle="">
      <ul className="flex flex-wrap justify-between items-start">
        {articles.map((article) => (
          <li key={`${article.id}`} className="w-full md:w-[48%]">
            <ArticleCard data={article} />
          </li>
        ))}
      </ul>
      <Pagination
        base="/"
        prefix="/pages"
        totalCount={totalCount}
        firstPageOffset={1}
        focused={+id}
      />
    </Layout>
  );
};

export default PageId;
