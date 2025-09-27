import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// src/api/posts.ts
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("โหลดข้อมูลโพสต์ไม่ได้");
    const data: Post[] = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unknown error");
  }
}
