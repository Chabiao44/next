export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("/api/posts");
  return res.json();
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const res = await fetch(`/api/posts/${postId}/comments`);
  return res.json();
};
