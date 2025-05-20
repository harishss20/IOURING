import { GetStaticProps } from "next";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts: posts.slice(0, 10) } };
};

export default function Home({ posts }: Props) {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mini Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
            <Link href={`/blog/${post.id}`} className="text-blue-500">
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
