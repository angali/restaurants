import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { HERE_API_ID, HERE_API_KEY, HERE_API_DISCOVER_URL } from "../../config";
import { IPlace } from "../../models/place";

type Data = {
  places?: IPlace[];
  error?: string;
};

// API endpoint to handle getting list of nearest places (restaurants).
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { latitude, longitude, q } = req.body;

  // url of HERE API endpoint for searching places with specific category
  const url = `${HERE_API_DISCOVER_URL}?at=${latitude},${longitude}&q=${q}&apiKey=${HERE_API_KEY}`;

  //retrive places
  return axios
    .get(url)
    .then(response => {
      return res.status(200).json({ places: response.data });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ error: "Can not read list of places" });
    });
}
