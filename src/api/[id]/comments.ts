import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
