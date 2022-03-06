import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { HEADERS, STOCKX_API_BASE_URL, } from "../../utils/config";
import { fiveZeroZero, fourZeroFour, twoZeroTwo } from "../../utils/response";

export default withApiAuthRequired(async function handler(req, res) {
    try {
        const { key, size } = req.query;
        if (!key || !size) return fourZeroFour(res);
        let response = await fetch(`${process.env.AUTH0_BASE_URL}/api/product?key=${key}`, { headers: { cookie: req.headers.cookie as string } })

        if (response.status !== 200) throw new Error()
        const reference = (await response.json()).data["Product"].children;

        const uid = Object.keys(reference).find(
            (k) => reference[k].shoeSize === size
        );
        response = await fetch(`${STOCKX_API_BASE_URL}/products/${uid}/activity?limit=100&page=1&sort=createdAt&order=DESC&state=480&currency=USD&country=US`, { headers: HEADERS });
        if (response.status !== 200) throw new Error();
        const json = await response.json();
        return twoZeroTwo(res, json['ProductActivity']);
    } catch (error) {
        return fiveZeroZero(res);
    }
});
