import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { props } from "../types/types";

const DEFAULT = "flex p-5 text-xl 2xl:text-2xl space-x-5 mx-20";
const TITLES = ["Home", "Login", "Register"];

const CURRENT = "font-bold text-s-yellow";
const OTHER = "font-semibold hover:underline";
const HOME = "mr-auto";

const Navbar = ({ className }: props) => {
  const merged = twMerge(DEFAULT, className);
  const { pathname } = useRouter();

  return (
    <nav className={merged}>
      {TITLES.map((title) => {
        const path = title === "Home" ? "/" : `/${title.toLowerCase()}`;
        let className = path === pathname ? CURRENT : OTHER;
        if (path === "/") className = twMerge(className, HOME);
        return (
          <Link key={title} href={path}>
            <a className={className}>{title}</a>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
