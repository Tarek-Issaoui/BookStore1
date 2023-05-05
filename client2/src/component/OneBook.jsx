import React,{useState} from "react";

const OneBook=(props)=>{
    const [show,setShow]=useState(false)
    const [hide,setHide]=useState(false)
    const [obj,setObj]=useState(props.book)
    
    const handleChange=(e)=>{
        setObj(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    return(
        <div>
            <img src={props.book.image} alt={props.book.title} width="250px" length="300px"/>
            <h3 onClick={()=>setShow(!show)}>{props.book.title}</h3>
            {show && <p>{props.book.author}</p>}
            <p>{props.book.price}</p>
            <button onClick={()=>setHide(!hide)} className="editBook">Edit</button>
            {hide && <div style={{display:"block"}}>
                        <label htmlFor="title">Title:</label><br/>
                        <input id="title" placeholder="title" name="title" value={obj.title} onChange={handleChange}/><br/>
                        <label htmlFor="author">author:</label><br/>
                        <input id="author" placeholder="author" name="author" value={obj.author} onChange={handleChange}/><br/>
                        <label htmlFor="image">Image:</label><br/>
                        <input id="image" placeholder="image" name="image" value={obj.image} onChange={handleChange}/><br/>
                        <button onClick={()=>props.update(props.book.title,obj)} className="editBook">Submit</button>
                    </div>}

        </div>
    )
}
export default OneBook;
// {/* <button onClick={setHide(!hide)}>Edit</button> */}