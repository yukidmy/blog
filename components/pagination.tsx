import { SquareIconButton, SquareTextButton } from "./square-button";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";

export const ARTICLES_PER_PAGE = 6;
const MAX_PAGINATION_BUTTONS = 5;

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

const formatPrefix = (prefix: string): string => {
  if (!prefix.startsWith("/")) {
    prefix = "/" + prefix;
  }
  if (!prefix.endsWith("/")) {
    prefix = prefix + "/";
  }
  return prefix;
};

const generatePageNumbersToShow = (
  max_page: number,
  focused: number
): Array<number> => {
  if (max_page <= MAX_PAGINATION_BUTTONS) {
    return range(1, max_page);
  }
  const threthold = Math.floor(MAX_PAGINATION_BUTTONS / 2);
  if (focused <= threthold || max_page - threthold < focused) {
    return range(1, threthold)
      .concat([0])
      .concat(range(max_page - threthold + 1, max_page));
  } else {
    return range(1, threthold - 1)
      .concat([0])
      .concat([focused])
      .concat([0])
      .concat(range(max_page - threthold + 2, max_page));
  }
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
    (totalCount + firstPageOffset) / ARTICLES_PER_PAGE
  );

  return (
    <nav className="w-full font-bold">
      <ul className="mt-5 mb-16 flex items-center justify-center">
        {focused > 1 ? (
          <li key="prev">
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
        {generatePageNumbersToShow(max_page, focused).map((number) =>
          number === 0 ? (
            <li key={number.toString()}>
              <div className="w-10 h-12 mx-1 grid place-items-center">...</div>
            </li>
          ) : focused === number ? (
            <li key={number.toString()}>
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
          )
        )}
        {focused < max_page ? (
          <li key="next">
            <SquareIconButton
              iconColor="slate-900"
              border={false}
              focus={false}
              href={`${prefix + +(focused + 1)}`}
              icon={faAngleRight}
              label="Prev"
            />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
