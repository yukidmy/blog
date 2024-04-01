import { ArticleCard } from "../../../components/article-card";
import { Layout } from "../../../components/layout";
import { Pagination, ARTICLES_PER_PAGE } from "../../../components/pagination";
import { Header } from "../../../components/sub-title-header";
import { article, tag } from "../../../libs/cms-types";
import { listArticlesByTag, listTags, readTag } from "../../../libs/microcms";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { NextPage } from "next";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const data = await listTags();
  const paths = data.reduce<string[]>((paths, tag) => {
    if (tag.count > ARTICLES_PER_PAGE) {
      const max_page = Math.ceil(tag.count / ARTICLES_PER_PAGE);
      const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      paths = paths.concat(
        range(2, max_page).map((repo) => `/tags/${tag.id}/${repo}`),
      );
    }
    return paths;
  }, []);

  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string; id: string }>,
): Promise<
  GetStaticPropsResult<{
    tag: tag;
    id: string;
    articles: Array<article>;
  }>
> => {
  if (!context.params) throw new Error("Not found: params");
  const { tag, id } = context.params;
  const tagData = await readTag(tag);
  const articles = await listArticlesByTag(
    tag,
    (+id - 1) * ARTICLES_PER_PAGE,
    ARTICLES_PER_PAGE,
  );
  return {
    props: { tag: tagData, id: id, articles: articles },
  };
};

const TagId: NextPage<{
  tag: tag;
  id: string;
  articles: Array<article>;
}> = ({ tag, id, articles }) => {
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
        {articles.map((article) => (
          <li key={`${article.id}`} className="w-full md:w-[48%]">
            <ArticleCard data={article} />
          </li>
        ))}
      </ul>
      <Pagination
        base={`/tags/${tag.id}`}
        prefix={`/tags/${tag.id}`}
        totalCount={tag.count}
        firstPageOffset={0}
        focused={+id}
      />
    </Layout>
  );
};

export default TagId;
