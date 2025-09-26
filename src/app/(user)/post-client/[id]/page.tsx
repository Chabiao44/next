"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export default function PostDetail() {
  const params = useParams();
  const id = params?.id as string; // id จะเป็น string
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
        ]);

        if (!postRes.ok || !commentRes.ok) throw new Error("โหลดข้อมูลไม่ได้");

        const postData: Post = await postRes.json();
        const commentData: Comment[] = await commentRes.json();

        setPost(postData);
        setComments(commentData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p style={{ color: "red" }}>ผิดพลาด: {error}</p>;
  if (!post) return <p>ไม่พบโพสต์</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2 style={{ marginTop: "20px" }}>Comments</h2>
      <pre style={{ background: "#f0f0f0", padding: "10px" }}>
        {JSON.stringify(comments, null, 2)}
      </pre>
    </div>
  );
}
