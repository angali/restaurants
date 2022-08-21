import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { HERE_API_KEY, HERE_API_LOOKUP_URL } from "../../config";
import { IPlace } from "../../models/place";

type Data = {
  place?: IPlace;
  error?: string;
};

// API endpoint to handle getting details of the place.
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;

  // url of HERE API endpoint for searching places with specific category
  const url = `${HERE_API_LOOKUP_URL}?id=${id}&apiKey=${HERE_API_KEY}`;

  //retrive places
  return axios
    .get(url)
    .then(response => {
      return res.status(200).json({ place: response.data });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(400)
        .json({ error: "Can not read the place information." });
    });
}
