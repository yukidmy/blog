import { SquareIconButton, SquareTextButton } from "./square-button";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";

export const ARTICLES_PER_PAGE = 6;

const formatPrefix = (prefix: string): string => {
  if (!prefix.startsWith("/")) {
    prefix = "/" + prefix;
  }
  if (!prefix.endsWith("/")) {
    prefix = prefix + "/";
  }
  return prefix;
};

export const Pagination: NextPage<{
  base: string;
  prefix: string;
  totalCount: number;
  firstPageOffset: number;
  focused: number;
}> = ({ base, prefix, totalCount, firstPageOffset, focused }) => {
  prefix = formatPrefix(prefix);
  const max_page = Math.ceil(
    (totalCount + firstPageOffset) / ARTICLES_PER_PAGE,
  );
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <nav className="w-full font-bold">
      <ul className="mt-5 mb-16 flex items-center justify-center">
        {focused > 1 ? (
          <li>
            <SquareIconButton
              iconColor="slate-900"
              border={false}
              focus={false}
              href={`${focused === 2 ? base : prefix + +(focused - 1)}`}
              icon={faAngleLeft}
              label="Next"
            />
          </li>
        ) : null}
        {range(1, max_page).map((number, index) =>
          focused === index + 1 ? (
            <li key="prev">
              <SquareTextButton
                iconColor="slate-900"
                border={false}
                focus={true}
                href={`${number === 1 ? base : prefix + number}`}
                text={number.toString()}
              />
            </li>
          ) : (
            <li key={number.toString()}>
              <SquareTextButton
                iconColor="slate-900"
                border={false}
                focus={false}
                href={`${number === 1 ? base : prefix + number}`}
                text={number.toString()}
              />
            </li>
          ),
        )}
        {focused < max_page ? (
          <li key="next">
            <SquareIconButton
              iconColor="slate-900"
              border={false}
              focus={false}
              href={`${prefix}${focused - 1}`}
              icon={faAngleRight}
              label="Prev"
            />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
