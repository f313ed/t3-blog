import Link from "next/link";
import { api } from "~/trpc/server";

const Blog = async () => {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const allBlogs = await api.post.getAllBlogs.query();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-10 text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs?.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
              <div className="transform rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20">
                <h3 className="mb-4 text-2xl font-bold group-hover:text-[hsl(280,100%,70%)]">
                  {blog.title}
                </h3>
                <div className="mb-4 text-lg">{blog.description}</div>
                <span className="text-base text-gray-400">
                  {blog.createdAt.toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/postBlog"
            className="rounded-md bg-orange-500 px-6 py-2 font-medium transition-colors duration-300 hover:bg-orange-600"
          >
            投稿する
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Blog;
