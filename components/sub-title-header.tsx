import Link from "next/link";
import { FC } from "react";

export const Header: FC<{
  subTitle: string;
  path: Array<{ href: string; subTitle: string }>;
}> = ({ subTitle, path }) => {
  return (
    <header className="w-full mb-10 flex flex-col justify-center items-center">
      <h1>{subTitle}</h1>
      <div className="w-24 h-px my-5 border-b border-slate-300"></div>
      <nav className="space-y-3">
        {path.map(({ href, subTitle }, i) => (
          <>
            {i === 0 ? null : <span className="mx-2">/</span>}
            <Link className="" href={href}>
              {subTitle}
            </Link>
          </>
        ))}
      </nav>
    </header>
  );
};
