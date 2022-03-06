import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { HEADERS, STOCKX_API_BASE_URL, } from "../../utils/config";
import { fiveZeroZero, fourZeroFour, twoZeroTwo } from "../../utils/response";

const FILTER =
  "&resultsPerPage=5&dataType=product&facetsToRetrieve[]=browseVerticals&propsToRetrieve[][]=brand&propsToRetrieve[][]=colorway&propsToRetrieve[][]=media.thumbUrl&propsToRetrieve[][]=title&propsToRetrieve[][]=productCategory&propsToRetrieve[][]=shortDescription&propsToRetrieve[][]=urlKey&propsToRetrieve[][]=retailPrice";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { keyword, page } = req.query;
    if (!keyword) return fourZeroFour(res);
    const response = await fetch(
      `${STOCKX_API_BASE_URL}/browse?_search=${keyword}&page=${page ?? 1} + ${FILTER}`, { headers: HEADERS, }
    );
    if (response.status !== 200) throw new Error();
    const json = await response.json()
    return twoZeroTwo(res, json['Products'])
  } catch (error) {
    return fiveZeroZero(res);
  }
});
