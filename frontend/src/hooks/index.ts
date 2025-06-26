import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string;
    "title":string;
    "id":number;
    "published":boolean;
    "createdAt": string;
    "author":{
        "name":string
    }
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export const useBlog=({ id } : { id:string })=>{
    const[loading,setLoading]=useState(true);
    const[blog,setBlog]=useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(response=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[id])

    return {
        loading,blog
    }
}

export const useBlogs=()=>{
    const[loading,setLoading]=useState(true);
    const[blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])

    return {
        loading,blogs
    }
}

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
  };
};

export const useUserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/userBlogs`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { blogs, loading };
};