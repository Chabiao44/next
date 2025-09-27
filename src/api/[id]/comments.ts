import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export async function getComments(id: string): Promise<Comment[]> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!res.ok) throw new Error("โหลดข้อมูลคอมเมนต์ไม่ได้");
    const data: Comment[] = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unknown error");
  }
}