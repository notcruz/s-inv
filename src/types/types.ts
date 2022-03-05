import { UserProfile } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

export interface props {
  children?: ReactNode;
  className?: string;
  user?: boolean;
}
