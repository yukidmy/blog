import { Layout } from "../components/layout";
import { SquareElementButton } from "../components/square-button";
import { Header } from "../components/sub-title-header";
import { tag } from "../libs/cms-types";
import { listTags } from "../libs/microcms";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { FC } from "react";

export const getStaticProps = async (
  _: GetStaticPropsContext<{}>
): Promise<
  GetStaticPropsResult<{
    tags: Array<tag>;
  }>
> => {
  const tags = await listTags();
  return {
    props: {
      tags: tags,
    },
  };
};

const Tags: FC<{ tags: Array<tag> }> = ({ tags }) => {
  return (
    <Layout subTitle="Tags">
      <Header
        subTitle="Tags"
        path={[
          { href: "/", subTitle: "Home" },
          {
            href: "/tags",
            subTitle: "Tags",
          },
        ]}
      />
      <ul className="flex flex-wrap justify-center items-center">
        {tags.map((tag) => (
          <li className="my-1">
            <SquareElementButton
              iconColor="teal-500"
              border={true}
              focus={false}
              href={`/tags/${tag.id}`}
            >
              {" "}
              <span>
                <FontAwesomeIcon icon={faHashtag} className="mr-1" />
                {`${tag.name} (${tag.count})`}
              </span>
            </SquareElementButton>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tags;
