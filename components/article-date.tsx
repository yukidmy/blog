import { article } from "../libs/cms-types";
import { parseISO, format } from "date-fns";
import { FC } from "react";

export const ArticleDate: FC<{ data: article }> = ({ data }) => {
  const date = parseISO(data.publishedAt);
  return (
    <time dateTime={data.publishedAt}>{format(date, "LLL dd, yyyy")}</time>
  );
};
