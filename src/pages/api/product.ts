import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { HEADERS, STOCKX_API_BASE_URL } from "../../utils/config";
import { fiveZeroZero, fourZeroFour, twoZeroTwo } from "../../utils/response";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { key } = req.query;
    if (!key) return fourZeroFour(res);
    const response = await fetch(`${STOCKX_API_BASE_URL}/products/${key}?includes=market&currency=USD&country=US`, { headers: HEADERS });
    if (response.status !== 200) throw new Error();
    const json = await response.json();
    return twoZeroTwo(res, json);
  } catch (error) {
    return fiveZeroZero(res);
  }
});
