import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface props {
  children: ReactNode;
  className?: string;
}

const DEFAULT = "bg-s-gray-200 h-screen text-s-white";

const Main = ({ children, className }: props) => {
  const merged = twMerge(DEFAULT, className);
  return <section className={merged}>{children}</section>;
};

export default Main;
