"use client";
import { useState, useCallback } from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function usePosts() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("โหลดโพสต์ไม่ได้");
      const data: Post[] = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, loading, error, fetchData };
}
