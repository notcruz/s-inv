import { User } from "@prisma/client";
import { DiscordUser } from "../types/types";
import { prisma } from "./prisma";

const createUser = ({ name, picture, email }: DiscordUser): Promise<User> => {
  return prisma.user.create({ data: { name, email, picture } });
};

export const fetchUser = async (user: DiscordUser, create: boolean = false): Promise<User | null> => {
  let res = await prisma.user.findUnique({ where: { email: user.email } });
  if (!res && create) res = await createUser(user);
  return res;
};
