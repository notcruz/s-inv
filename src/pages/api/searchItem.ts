import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const session = getSession(req, res);
    fetch('')
    return res.status(200).json({ status: "true" });
  } catch (error) {
    res.status(500).json({ code: 500, message: "It's me, not you." });
  }
});
