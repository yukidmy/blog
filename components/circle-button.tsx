import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

export const CircleIconButton: FC<{
  iconColor: string;
  border: boolean;
  focus: boolean;
  href: string;
  icon: IconDefinition;
}> = ({ iconColor, border, focus, href, icon }) => {
  return (
    <Link
      className={`w-12 h-12 mx-1 rounded-full grid place-items-center ${
        border
          ? `border border-${iconColor} hover:border-teal-500 hover:bg-teal-500 hover:text-white`
          : `hover:border hover:border-${iconColor}`
      } ${focus ? `text-white bg-${iconColor}` : `text-${iconColor}`}`}
      href={href}
      target="_blank"
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </Link>
  );
};
