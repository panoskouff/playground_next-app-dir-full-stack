export const revalidate = 420;

interface Post {
  title: string;
  slug: string;
  content: string;
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json()
  );

  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export default async function BlogPostPage({ params }: Props) {
  // deduped
  const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json()
  );
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
