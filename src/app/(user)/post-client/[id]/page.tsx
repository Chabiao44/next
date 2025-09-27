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

type Props = {
  params: { id: string };
};

export default function PostDetail({ params }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`),
        ]);

        if (!postRes.ok || !commentRes.ok) throw new Error("โหลดข้อมูลไม่ได้");

        const postData: Post = await postRes.json();
        const commentData: Comment[] = await commentRes.json();

        setPost(postData);
        setComments(commentData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

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