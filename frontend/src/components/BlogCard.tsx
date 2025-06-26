import { Link } from "react-router-dom"
import { Blog } from "../hooks";

export const BlogCard = ({ blog }: { blog: Blog }) => {
  if (!blog) return null;

  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="font-mono border-b border-slate-400 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={blog.author.name || "U"} />
          <div className="pl-2 font-extralight text-sm flex justify-center flex-col">
            {blog.author.name || "Unknown Author"}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {new Date(blog.createdAt).toDateString()}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          {blog.title}
        </div>
        <div className="text-md font-thin">
          {`${blog.content.slice(0, 100)}...`}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">
          {`${Math.ceil(blog.content.length / 100)} minutes`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400" />;
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {name?.[0] || "U"}
      </span>
    </div>
  );
}
