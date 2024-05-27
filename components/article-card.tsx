import { article } from "../libs/cms-types";
import { ArticleDate } from "./article-date";
import { MicroCmsImage } from "./microcms-image";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Link from "next/link";

export const ArticleCard: NextPage<{ data: article }> = ({ data }) => {
  return (
    <div className="w-full mb-14">
      <div className="relative w-full mb-5 aspect-video">
        <Link href={`/${data.id}`}>
          <MicroCmsImage
            src={data.eyecatch.url}
            alt="cover image"
            loading="eager"
          />
        </Link>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-x-5">
          <span>
            <ArticleDate data={data} />
          </span>
          <ul className="flex flex-wrap gap-x-3">
            {data.tags.map((tag) => (
              <li key={`${tag.id}`}>
                <Link className="text-teal-500" href={`/tags/${tag.id}`}>
                  <FontAwesomeIcon icon={faHashtag} className="mr-1" />
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link href={`/${data.id}`}>
            <h1 className="line-clamp-2">{data.title}</h1>
          </Link>
        </div>
        <article className="line-clamp-4">{data.summary}</article>
      </div>
    </div>
  );
};
