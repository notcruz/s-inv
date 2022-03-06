import { Item, User } from "@prisma/client";
import { DiscordUser, storedItem } from "../types/types";
import { prisma } from "./prisma";

const createUser = ({ name, picture, email }: DiscordUser) => {
  return prisma.user.create({ data: { name, email, picture, inventory: { create: [] } }, include: { inventory: true } });
};

export const fetchUser = async (user: DiscordUser, create: boolean = false): Promise<User & {
  inventory: Item[];
} | null> => {
  let res = await prisma.user.findUnique({ where: { email: user.email }, include: { inventory: true } });
  if (!res && create) return await createUser(user);
  return res;
};

export const addItem = (user: DiscordUser, item: string) => {
  const parsedItem = JSON.parse(item)
  return prisma.user.update({
    where: { email: user.email }, data: {
      inventory: {
        create: {
          image: parsedItem.image,
          name: parsedItem.name,
          id: parsedItem.id,
          color: parsedItem.color,
          size: parsedItem.size,
          category: parsedItem.category,
          urlKey: parsedItem.urlKey,
          brand: parsedItem.brand, purchase_price: parsedItem.purchase_price
        }
      }


    }
  })
}

export const updateInventory = (user: DiscordUser, inventory: Item[]) => {
  return prisma.user.update({ where: { email: user.email }, data: { inventory: { set: inventory } } })
}

export const getInventory = (user: DiscordUser) => {
  return prisma.user.findUnique({ where: { email: user.email }, include: { inventory: true } })
}