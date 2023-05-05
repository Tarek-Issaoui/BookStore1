import React, { useState } from "react";

const OnePost=(props)=>{
    const [show,setShow]=useState(false)
    const [desc,setDesc]=useState('')
    return(
        <div className="box">
            <h1>{props.post.title}</h1>
            <p>{props.post.description}</p>
            <div style={{display:"flex"}} >
                <button onClick={()=>setShow(!show)} className="onepost">{!show ? "Edit" : "Hide"}</button>
                <button onClick={()=>props.deletePost(props.post.title)} className="onepost">Delete</button>
            </div>
            {show && <div>
                <label htmlFor="description">Description:</label>
                <input id="description" placeholder="description" name="description" value={desc} onChange={(e)=>setDesc(e.target.value)}/><br/>
                <button onClick={()=>props.update({iduser:props.post.iduser,title:props.post.title,description:desc})} className="onepost">Submit</button>
            </div>}
        </div>
    )
}
export default OnePost;