import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Latest Posts</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts !== null &&
          posts.map((post) => (
            <div key={post.id} className="rounded-lg border p-4">
              <img
                src={post.image}
                alt="Post"
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <div className="mb-4 flex items-center">
                <img src={post.avatar} alt="Author" className="mr-4 h-10 w-10 rounded-full" />
                <div>
                  <h2 className="text-xl font-semibold">
                    {post.firstName} {post.lastName}
                  </h2>
                </div>
              </div>
              <p>{post.writeup}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
