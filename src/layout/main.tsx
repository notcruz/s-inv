import { twMerge } from "tailwind-merge";
import { props } from "../types/types";

const DEFAULT = "h-screen select-none mx-auto max-width flex flex-col";

const Main = ({ children, className }: props) => {
  const merged = twMerge(DEFAULT, className);
  return <main className={merged}>{children}</main>;
};

export default Main;
