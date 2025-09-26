import axios from "axios";

type Post = { id: number; title: string };

export default async function PostsPage() {
  try {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      { timeout: 5000 } // กันรอเกินไป
    );
    const posts = res.data;

    return (
      <div>
        <h1>Posts (Axios)</h1>
        <ul>
          {posts.slice(0, 5).map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    // ✅ ถ้า fetch ล้มเหลว ให้แสดงข้อความแทน
    console.error("Failed to fetch posts:", err);
    return (
      <div>
        <h1>Posts (Axios)</h1>
        <p style={{ color: "red" }}>ไม่สามารถโหลดโพสต์ได้</p>
      </div>
    );
  }
}
