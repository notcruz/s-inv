import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { HEADERS, STOCKX_BASE_URL } from "../../utils/config";
import { fourZeroFour } from "../../utils/response";

const FILTER =
  "&page=1&resultsPerPage=10&dataType=product&facetsToRetrieve[]=browseVerticals&propsToRetrieve[][]=brand&propsToRetrieve[][]=colorway&propsToRetrieve[][]=media.thumbUrl&propsToRetrieve[][]=title&propsToRetrieve[][]=productCategory&propsToRetrieve[][]=shortDescription&propsToRetrieve[][]=urlKey";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { key } = req.query;
    if (!key) return fourZeroFour(res);
    const response = await fetch(
      `${STOCKX_BASE_URL}/browse?_search=${key + FILTER}`,
      {
        headers: HEADERS,
      }
    );
    if (response.status !== 200) throw new Error();
    return res.status(200).json(await response.json());
  } catch (error) {
    res.status(500).json({ code: 500, message: "It's me, not you." });
  }
});
