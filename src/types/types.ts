import { Claims, UserProfile } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";


export interface props {
  className?: string;
  children?: ReactNode;
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

export interface item {
  brand: string;
  objectID: string;
  colorway: string;
  productCategory: string;
  title: string;
  urlKey: string;
  retailPrice: number;
}

export interface auth {
  user: {
    email: string;
    name: string;
    picture: string;
  }
}
