import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const SquareIconButton: NextPage<{
  iconColor: string;
  border: boolean;
  focus: boolean;
  href: string;
  icon: IconDefinition;
  label: string;
}> = ({ iconColor, border, focus, href, icon, label }) => {
  return (
    <Link
      className={`w-12 h-12 mx-1 rounded-xl grid place-items-center ${
        border
          ? `border border-${iconColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white`
          : `hover:border hover:border-${iconColor}`
      } ${focus ? `text-white bg-${iconColor}` : `text-${iconColor}`}`}
      href={href}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </Link>
  );
};

export const SquareTextButton: NextPage<{
  iconColor: string;
  border: boolean;
  focus: boolean;
  href: string;
  text: string;
}> = ({ iconColor, border, focus, href, text }) => {
  return (
    <Link
      className={`w-12 h-12 mx-1 rounded-xl grid place-items-center ${
        border
          ? `border border-${iconColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white`
          : `hover:border hover:border-${iconColor}`
      } ${focus ? `text-white bg-${iconColor}` : `text-${iconColor}`}`}
      href={href}
    >
      {text}
    </Link>
  );
};

export const SquareElementButton: NextPage<{
  iconColor: string;
  border: boolean;
  focus: boolean;
  href: string;
  children: ReactNode;
  label: string;
}> = ({ iconColor, border, focus, href, children, label }) => {
  return (
    <Link
      className={`min-w-12 h-12 mx-1 px-4 rounded-xl grid place-items-center ${
        border
          ? `border border-${iconColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white`
          : `hover:border hover:border-${iconColor}`
      } ${focus ? `text-white bg-${iconColor}` : `text-${iconColor}`}`}
      href={href}
      aria-label={label}
    >
      {children}
    </Link>
  );
};
