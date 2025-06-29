import { ChangeEvent, useState } from 'react'
import { AppBar } from '../components/AppBar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export const Publish = () => {
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const navigate=useNavigate();
  return <div>
    <AppBar/>
    <div className='flex justify-center w-full'>
        <div className='max-w-screen-lg w-full pt-4'>
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }} type="text" aria-describedby="helper-text-explanation" className="focus outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Title"/>

            <TextEditor onChange={(e)=>{
                setDescription(e.target.value)
            }}/>

            <button onClick={async()=>{
             const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content:description
            },{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`)
            }} type="submit" className="text-sm font-mono border px-4 py-1 h-10 rounded-md hover:bg-black hover:text-white transition">
           Publish post
            </button>
        </div>
  </div>
</div> 
}

function TextEditor({ onChange }:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
       <div className="w-full mb-4 ">
           <div className='flex items-center justify-between '>
            <div className='my-2 rounded-b-lg w-full'>
                <label className='sr-only'>Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className='focus outline-none block w-full px-0 text-sm text-gray-800 bg-gray-100 border-gray-400 border-0 pl-2 rounded-lg ' placeholder='Write something...' required></textarea>
            </div>
           </div>
       </div>
       
    </div>
    
}