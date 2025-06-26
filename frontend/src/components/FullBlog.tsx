
import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <AppBar/>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          {blog.title}
        </h1>

        {/* Author & Date Info */}
        <div className="flex items-center gap-4 pt-6 text-sm text-gray-600">
          <Avatar name={blog.author.name || "Anonymous"} />
          <div>
            <div className="font-semibold text-black">{blog.author.name || "Anonymous"}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>{new Date(blog.createdAt).toDateString()}</span>
              <span>•</span>
              <span>{`${Math.ceil(blog.content.length / 100)} minutes`} read</span>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="pt-10 text-[1.05rem] leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
};
