import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
  const {id} =useParams();
  const {loading,blog}=useBlog({
    id:id || ""
  });

  if(loading){
    return <div>
      <AppBar/>
      <div className="flex justify-center">
      <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>

      </div>
    </div>
    </div>
  }
  if (!blog) {
    return (
      <div>
        <AppBar />
        <div className="text-center text-gray-500 mt-10">Blog not found</div>
      </div>
    );
  } 
  return <div>
      <FullBlog blog={blog}/>
  </div>
}
