import { faHamburger, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useState } from "react";

export const Navbar: FC<{}> = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-2xl shadow-teal-200/5 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full h-24 px-5 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <p className="text-xl font-site-title"># ゆのろぐ</p>
        </Link>
        <ul className="hidden mx-1 space-x-8 md:flex">
          <li key="about">
            <Link href="/about">About</Link>
          </li>
          <li key="tags">
            <Link href="/tags">Tags</Link>
          </li>
        </ul>
        <button
          className="w-7 h-7 grid place-items-center md:hidden"
          aria-label="Menu"
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          {isHamburgerOpen ? (
            <FontAwesomeIcon
              icon={faTimes}
              className="text-slate-700"
              size="xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faHamburger}
              className="text-slate-700"
              size="xl"
            />
          )}
        </button>
      </div>
      <div className="relative w-full h-0 md:hidden">
        <ul
          className={`transition-all duration-500 transform ease-in-out absolute top-0 w-full h-24 space-y-2 bg-white shadow-2xl shadow-teal-500/5 flex flex-col justify-center items-center overflow-hidden ${
            isHamburgerOpen ? "max-h-24" : "max-h-0"
          }`}
        >
          <li>
            <Link className="w-full text-center" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="w-full text-center" href="/tags">
              Tags
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
