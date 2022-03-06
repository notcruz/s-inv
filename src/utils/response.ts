import { NextApiResponse } from "next";

export const twoZeroTwo = (res: NextApiResponse, json: Object) => {
  return res.status(200).json({ code: 200, data: json });
};

export const fourZeroFour = (res: NextApiResponse) => {
  return res.status(400).json({ code: 400, data: "You sure that was right?" });
};

export const fiveZeroZero = (res: NextApiResponse) => {
  return res.status(500).json({ code: 500, message: "It's me, not you." });
}