import { useState,useEffect } from "react";
import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"


export const FullBlog=({ blog }:{blog:Blog})=>{
    const [currentDate, setCurrentDate] = useState(new Date());
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);
    return <div>
        <AppBar/>
        <div className="grid grid-cols-12 px-10 w-full pt-5">
        <div className="col-span-8">
            <div className="text-5xl font-extrabold">
                {blog.title} 
            </div>
            <div className="text-slate-500 pt-4">
                {currentDate.toLocaleDateString()}
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-gray-400">
                Author
            </div>
            <div className="flex-w-full ">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar name={blog.author.name || "Anonymous"}/>
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name||"Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random catch phrase about the author's ability to grab the user's attention
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
}