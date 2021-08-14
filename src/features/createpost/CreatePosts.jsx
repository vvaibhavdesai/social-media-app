import React,{ useState,useEffect } from "react";
import axios from "axios"
import "./CreatePosts.css";
import { useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify";

export function CreatePosts() {
  const [ title, setTitle ] = useState("")
  const [ body, setBody ] = useState("")
  const [ image, setImage ]= useState("")
  const [ url, setUrl ] = useState("")
  const token = useSelector(state=>state.users.token)
  console.log(url,"yeh h url")

  useEffect(()=>{
    if(url){
      sendPostsToDb()
    }
  },[url])

  
  const CLOUDINARY_URL_API = 'https://api.cloudinary.com/v1_1/dqn2jzk2n/image/upload '
  
  const CREATE_POST_API = 'https://socialMedia.vaibhavdesai888.repl.co/posts/createposts'
  
    const postImagetoCloudinary = async(imgData)=>{
      try{
        const { data } = await axios.post(CLOUDINARY_URL_API,imgData)
        setUrl(data.secure_url)
      }catch(error){
        console.log(error.message)
      }
    }

  const postDetailsAppender = ()=>{
    const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","anti-gram")
        data.append("cloud_name","dqn2jzk2n")
        console.log(data)
     postImagetoCloudinary(data)

  }

  const notify=(message)=>toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const sendPostsToDb = async()=>{
    try{
      const res = await axios.post(CREATE_POST_API,{
        data:{
          title,
          body,
          pictureUrl:url
        }
      },
      {
        headers: {
          Authorization: token,
        },
      }
      )
      setTitle("")
      setBody("")
      setImage("")
      notify("Upload Succesfull")
    }catch(error){
      notify(error.response.message)
      console.log(error.message)
    }
  }

  return (
    <div className="createpost-content">
      Welcome to posting
      <ToastContainer/>
      <div>
        <div>
          <input
          value={title} 
          maxLength={110}
          onChange={(e)=>setTitle(e.target.value)}
          type="text" />
          <label>title</label>
        </div>
        <div>
          <input 
          value={body}
          maxLength={220}
          onChange={(e)=>setBody(e.target.value)}
          type="text" />
          <label>body</label>
        </div>
        <div>
          <input 
          style={{whiteSpace: "normal",
            wordWrap: "break-word",
            width: "200px",
            overflow: "auto",}}
          onChange={(e)=>setImage(e.target.files[0])}
          type="file" />
        </div>
        <button onClick={()=>postDetailsAppender()}>upload</button>
      </div>
    </div>
  );
}
