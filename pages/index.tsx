import { ArticleCard } from "../components/article-card";
import { Layout } from "../components/layout";
import { Pagination, ARTICLES_PER_PAGE } from "../components/pagination";
import { article } from "../libs/cms-types";
import { listArticles } from "../libs/microcms";
import { GetStaticPropsResult } from "next";
import type { NextPage } from "next";

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    articles: Array<article>;
    totalCount: number;
  }>
> => {
  const articles = await listArticles(0, ARTICLES_PER_PAGE - 1);
  const totalCount = await (await listArticles()).length;
  return {
    props: {
      articles: articles,
      totalCount: totalCount,
    },
  };
};

const Home: NextPage<{ articles: Array<article>; totalCount: number }> = ({
  articles,
  totalCount,
}) => {
  return (
    <Layout subTitle="">
      <div className="flex flex-wrap justify-between items-start">
        {articles.map((article, i) => (
          <div
            key={i.toString()}
            className={`${i === 0 ? "w-full" : "w-full md:w-[48%]"}`}
          >
            <ArticleCard data={article} />
          </div>
        ))}
      </div>
      <Pagination
        base="/"
        prefix="/pages"
        totalCount={totalCount}
        firstPageOffset={1}
        focused={1}
      />
    </Layout>
  );
};

export default Home;
