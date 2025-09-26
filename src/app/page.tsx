"use client";

import { useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts JSON Viewer</h1>
      <button onClick={fetchPosts} style={{ marginBottom: "20px" }}>
        โหลด Posts
      </button>

      {loading && <p>กำลังโหลด...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data.length > 0 && (
        <pre style={{ background: "#f0f0f0", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
