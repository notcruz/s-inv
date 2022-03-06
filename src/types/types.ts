import { Claims, UserProfile } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

export interface props {
  children?: ReactNode;
  className?: string;
  user?: boolean;
}

export interface DiscordUser extends Claims {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: true;
}

export interface auth {
  user: {
    email: string;
    name: string;
    picture: string;
  }
}
