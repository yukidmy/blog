import { SquareIconButton } from "./square-button";
import {
  faTwitter,
  faInstagram,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC<{}> = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 w-full h-32">
      <ul className="mt-9 mb-5 w-full mx-auto flex items-center justify-center">
        <li key="twitter">
          <SquareIconButton
            iconColor="slate-50"
            border={true}
            focus={false}
            href="https://twitter.com/yukidmy"
            icon={faTwitter}
            label="Go to Yuki's Twitter"
          />
        </li>
        <li key="instagram">
          <SquareIconButton
            iconColor="slate-50"
            border={true}
            focus={false}
            href="https://instagram.com/yukidmy"
            icon={faInstagram}
            label="Go to Yuki's Instagram"
          />
        </li>
        <li key="github">
          <SquareIconButton
            iconColor="slate-50"
            border={true}
            focus={false}
            href="https://github.com/yukidmy"
            icon={faGithub}
            label="Go to Yuki's GitHub"
          />
        </li>
        <li key="linkedin">
          <SquareIconButton
            iconColor="slate-50"
            border={true}
            focus={false}
            href="https://linkedin.com/in/yukidmy"
            icon={faLinkedinIn}
            label="Go to Yuki's LinkedIn"
          />
        </li>
        <li key="amazon">
          <SquareIconButton
            iconColor="slate-50"
            border={true}
            focus={false}
            href="https://www.amazon.jp/hz/wishlist/ls/2LA6Q65P7GUC3"
            icon={faGift}
            label="Go to Yuki's Wish List"
          />
        </li>
      </ul>
      <div className="mb-0 h-6 w-full text-center">
        <p>
          © {format(new Date(), "yyyy")}{" "}
          <Link href="https://yukidmy.com">Yuki Y</Link>
        </p>
      </div>
    </footer>
  );
};
