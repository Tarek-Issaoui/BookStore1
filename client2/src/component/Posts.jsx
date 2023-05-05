import axios from "axios";
import React,{useEffect, useState} from "react";
import OnePost from './OnePost.jsx'
const Posts=(props)=>{
    const [posts,setPosts]=useState([])
    const [count,setCount]=useState(0)
    const [onePost,setOnePost]=useState({
        iduser:props.id,
        title:"",
        description:""
    });
    const handleChange=(e)=>{
        setOnePost(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const addPost=async()=>{
        await axios.post('http://localhost:5000/post',onePost)
        setCount(count+1)
    }
    const getPosts=async()=>{
        const res=await axios.get(`http://localhost:5000/post/${props.id}`)
        setPosts(res.data)

    }
    const deletePost=async(str)=>{
        await axios.delete(`http://localhost:5000/post/delete/${str}`)
        setCount(count+1)
    }
    const update=async(obj)=>{
        console.log(obj)
        await axios.put(`http://localhost:5000/post/${obj.title}`,obj);
        setCount(count+1)
    }
    useEffect(()=>{
        getPosts()
    },[count])
    return(
        <div>
            <div className="post">
                <input id="title" placeholder="Title of your post" name="title" value={onePost.title} onChange={handleChange}/><br/>
                <input id="description" placeholder="write something ..." name="description" value={onePost.description} onChange={handleChange}/><br/>
                <button onClick={()=>addPost()} className="forPost">Add Post</button>
            </div>
            <div>
                {posts.map((post,i)=>{
                    return (
                    <OnePost key={i} post={post} deletePost={deletePost} update={update}/>
                    )
                })}
            </div>
        </div>
    )
}
export default Posts;