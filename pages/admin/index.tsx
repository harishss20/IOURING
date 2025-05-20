import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  posts: Post[];
  auth: boolean;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = true;

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return { props: { posts: posts.slice(0, 10), auth } };
};

export default function Admin({ posts, auth }: Props) {
  const [list, setList] = useState(posts);

  if (!auth) return <p className="p-4">Not authorized.</p>;

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        <Link
          href="/admin/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Post
        </Link>
      </div>
      <ul>
        {list.map((post) => (
          <li key={post.id} className="flex justify-between py-2 border-b">
            <span>{post.title}</span>
            <div className="space-x-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
