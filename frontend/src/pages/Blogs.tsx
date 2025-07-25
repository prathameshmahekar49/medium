import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading,blogs}=useBlogs();
  

  if(loading){
    return <div>
      <AppBar/>
      <div className="flex justify-center">
      <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      </div>
    </div>
    </div>
  }
  
  return <div>
    <AppBar/>
    <div className="font-mono max-w-4xl mx-auto px-4 py-10">
        {/* Title Section */}
        <h1 className="text-7xl font-extrabold text-center">DevBlog</h1>
        <p className="text-center text-gray-500 pt-2">
          A minimal, developer-focused blog platform. Clean code, clear thoughts.
        </p>
        
    </div>
    <div className="flex justify-center m-2 ">
      
      <div>
        {blogs.map(blog=> <BlogCard blog={blog}/>)}
        
      </div>
  </div>
</div>
  
}
