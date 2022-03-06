import { item } from "../types/types";

export const STOCKX_API_BASE_URL = "https://stockx.com/api";

export const STOCKX_BASE_URL = "https://stockx.com/"

export const ITEM_IMAGE = (desc: string) => `https://images.stockx.com/images/${desc}.jpg?fit=fill&w=700&h=500&auto=format`

export const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
};
