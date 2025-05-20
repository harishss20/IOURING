import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.slice(0, 5).map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();
  return { props: { post } };
};

export default function BlogDetail({ post }: { post: Post }) {
  if (!post) return <p className="p-4">Loading...</p>;
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      <Link href="/" className="text-blue-600 block mt-4">
        ← Back to Home
      </Link>
    </main>
  );
}
