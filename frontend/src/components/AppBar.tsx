import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <header className="font-mono sticky top-0 z-50 bg-white border-b px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between relative">
        
        <Link to="/blogs"
        onClick={()=>{
          if(window.location.pathname==="/blogs"){
            window.scrollTo({top:0,behavior:"smooth"});
          }
        }} className="flex items-center gap-2 z-10">
          <div className="bg-black text-white font-bold text-xs px-1 py-0.5 rounded">DB</div>
          <span className="font-semibold text-lg font-mono">DevBlog</span>
        </Link>

        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
          <Link to="/blogs"
        onClick={()=>{
          if(window.location.pathname==="/blogs"){
            window.scrollTo({top:0,behavior:"smooth"});
          }
        }}  className="text-sm text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm text-gray-700 hover:text-black">
            Dashboard
          </Link>
        </div>


        <div className="flex items-center gap-4 z-10">
          <Link to="/publish">
            <button className="text-sm font-mono border px-4 py-1 rounded-md hover:bg-black hover:text-white transition">
              Write
            </button>
          </Link>
          <Link to="/profile">
            <Avatar name={"Anonymous"} />
          </Link>
        </div>
      </div>
    </header>
  );
};
