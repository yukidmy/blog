import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const SquareIconButton: NextPage<{
  textColor: string;
  borderColor: string;
  focus: boolean;
  href: string;
  icon: IconDefinition;
  label: string;
}> = ({ textColor, borderColor, focus, href, icon, label }) => {
  return (
    <Link
      className={`w-12 h-12 mx-1 rounded-xl grid place-items-center border ${borderColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white ${focus ? `text-white bg-teal-500` : `${textColor}`}`}
      href={href}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </Link>
  );
};

export const SquareTextButton: NextPage<{
  textColor: string;
  borderColor: string;
  focus: boolean;
  href: string;
  text: string;
}> = ({ textColor, borderColor, focus, href, text }) => {
  return (
    <Link
      className={`w-12 h-12 mx-1 rounded-xl grid place-items-center border ${borderColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white ${focus ? `text-white bg-teal-500` : `${textColor}`}`}
      href={href}
    >
      {text}
    </Link>
  );
};

export const SquareElementButton: NextPage<{
  textColor: string;
  borderColor: string;
  focus: boolean;
  href: string;
  children: ReactNode;
  label: string;
}> = ({ textColor, borderColor, focus, href, children, label }) => {
  return (
    <Link
      className={`min-w-12 h-12 mx-1 px-4 rounded-xl grid place-items-center border ${borderColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white ${focus ? `text-white bg-teal-500` : `${textColor}`}`}
      href={href}
      aria-label={label}
    >
      {children}
    </Link>
  );
};
