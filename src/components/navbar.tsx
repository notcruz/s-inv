import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { props } from "../types/types";

const DEFAULT = "flex p-5 text-xl 2xl:text-2xl space-x-5 mx-20";
const SECTIONS = ["Home"];

const TRANSITION = "transition ease-in-out hover:opacity-75";
const HOME = "font-bold text-s-red";
const OTHER = "font-semibold";

interface propsExtended extends props {
  user: boolean;
}

const Navbar = ({ className, user }: propsExtended) => {
  const merged = twMerge(DEFAULT, className);
  const status = user ? "Logout" : "Login";

  return (
    <nav className={merged}>
      <div className="space-x-5 mr-auto">
        {SECTIONS.map((title) => {
          const path = () => {
            if (title === "Home" && user) return "/home";
            else return "/";
          };
          const className = title === "Home" ? HOME : OTHER;
          return (
            <Link key={title} href={path()}>
              <a className={twMerge(className, TRANSITION)}>{title}</a>
            </Link>
          );
        })}
      </div>
      <div>
        <Link href={`/api/auth/${status.toLocaleLowerCase()}`}>
          <a className={twMerge(OTHER, TRANSITION)}>{status}</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
