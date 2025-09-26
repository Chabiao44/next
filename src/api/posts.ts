import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
