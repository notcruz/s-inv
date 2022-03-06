import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { twoZeroTwo } from "../../utils/response";

export default withApiAuthRequired(async function handler(req, res) {
    try {
        return twoZeroTwo(res, {})
    } catch (error) {
        return res.status(500).json({ code: 500, message: "It's me, not you." });
    }
});
