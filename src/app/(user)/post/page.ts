import axios from "axios";

type Post = { id: number; title: string };

export default async function PostsPage() {
  // ✅ ดึงข้อมูลด้วย axios
  const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  return (
    <div>
      <h1>Posts (Axios)</h1>
      <ul>
        {posts.map((p, index) => (
          <li key={p.id}>
            {index + 1}. {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
