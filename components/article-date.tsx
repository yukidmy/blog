import { article } from "../libs/cms-types";
import { parseISO, format } from "date-fns";
import type { NextPage } from "next";

export const ArticleDate: NextPage<{ data: article }> = ({ data }) => {
  const date = parseISO(data.publishedAt);
  return (
    <time dateTime={data.publishedAt}>{format(date, "LLL dd, yyyy")}</time>
  );
};
