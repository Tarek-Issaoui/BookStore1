import React,{useState,useEffect} from "react";
import axios from "axios";
import OneBook from "./OneBook";
const Allbooks=(props)=>{
    const [data,setData]=useState([]);
    const [count,setCount]=useState(0);
    const [obj,setObj]=useState({
        iduser: 1,
        title: '' ,
        author: '',
        image: '',
        price: ''
      })
    const  handleChange=(e)=>{
        setObj(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
      }
    const fetch=async()=>{
    const res=await axios.get("http://localhost:5000/book")
        setData(res.data)
      }
      const update=async(id,obj)=>{
          await axios.put(`http://localhost:5000/book/${id}`,obj)
          setCount(count+1)
        }
    const addBook=async(book)=>{
        console.log(book)
        await axios.post("http://localhost:5000/book",book);
        setCount(count+1)
    }
    useEffect(()=>{
        fetch()
    },[count]);
    return(
        <div>
            <div className="addBook">
                <h3>Add a Book:</h3>
                <input type="text" placeholder="book title" name="title" value={obj.title} onChange={handleChange}/>
                <input type="text" placeholder="book author" name="author" value={obj.author} onChange={handleChange}/>
                <input type="text" placeholder="image-Url" name="image" value={obj.image} onChange={handleChange}/>
                <input type="text" placeholder="set a price" name="price" value={obj.price} onChange={handleChange}/><br/>
                <button onClick={()=>addBook(obj)} className="editBook">Add Book</button>
            </div>
            {data.map((book,i)=>{
          return (
            <OneBook key={i} book={book} update={update}/>
          )
        })
        }
        </div>
    )
}
export default Allbooks;