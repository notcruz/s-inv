import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { DiscordUser, storedItem } from "../../types/types";
import { addItem, fetchUser } from "../../utils/query";
import { fiveZeroZero, twoZeroTwo } from "../../utils/response";

export default withApiAuthRequired(async function handler(req, res) {
    try {
        const session = getSession(req, res) as Session;
        const user = await fetchUser(session.user as DiscordUser, false);
        if (!user) throw new Error()
        console.log(req.body)
        await addItem(session.user as DiscordUser, req.body)
        return twoZeroTwo(res, {})
    } catch (error) {
        console.log(error)
        return fiveZeroZero(res)
    }
});
