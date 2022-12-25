import { SquareIconButton, SquareTextButton } from "./square-button";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

export const ARTICLES_PER_PAGE = 6;

export const Pagination: FC<{ totalCount: number; focused: number }> = ({
  totalCount,
  focused,
}) => {
  const max_page = Math.ceil((totalCount + 1) / ARTICLES_PER_PAGE);
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
              href={`/pages/${focused - 1}`}
              icon={faAngleLeft}
            />
          </li>
        ) : null}
        {range(1, max_page).map((number, index) =>
          focused === index + 1 ? (
            <li>
              <SquareTextButton
                iconColor="slate-900"
                border={false}
                focus={true}
                href={`${number === 1 ? "/" : "/pages/" + number}`}
                text={number.toString()}
              />
            </li>
          ) : (
            <li>
              <SquareTextButton
                iconColor="slate-900"
                border={false}
                focus={false}
                href={`${number === 1 ? "/" : "/pages/" + number}`}
                text={number.toString()}
              />
            </li>
          )
        )}
        {focused < max_page ? (
          <li>
            <SquareIconButton
              iconColor="slate-900"
              border={false}
              focus={false}
              href={`/pages/${focused - 1}`}
              icon={faAngleRight}
            />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
