import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Item } from "@prisma/client";
import { DiscordUser, storedItem } from "../../types/types";
import { addItem, fetchUser, getInventory, updateInventory } from "../../utils/query";
import { fiveZeroZero, fourZeroFour, twoZeroTwo } from "../../utils/response";

export default withApiAuthRequired(async function handler(req, res) {
    try {
        console.log(1)
        const session = getSession(req, res) as Session;
        const user = await fetchUser(session.user as DiscordUser, false);
        if (!user) throw new Error()
        if (req.method === 'DELETE') {
            if (!req.query.id) throw new Error()
            const response = await fetch(`${process.env.AUTH0_BASE_URL}/api/inventory`, { headers: { cookie: req.headers.cookie as string } })
            if (response.status !== 200) return fourZeroFour(res)
            const json: Item[] = (await response.json())['data']
            const newInv = json.filter((item) => item.objectID !== Number.parseInt(req.query.id as string))
            await updateInventory(session.user as DiscordUser, newInv)
            return twoZeroTwo(res, {})
        } else {
            const inv = await getInventory(session.user as DiscordUser)
            if (inv?.inventory)
                return twoZeroTwo(res, inv.inventory)
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return fiveZeroZero(res)
    }
});
