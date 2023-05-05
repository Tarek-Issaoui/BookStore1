import axios from 'axios';
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Home=(props)=>{
    console.log(props)
    const [show ,setShow]=useState(false)
    const [sigIn,setSignIn]=useState('')
    const [user,setUser]=useState({
        name:"",
        email:"",
        phoneNumber:'',
        img:""
      })
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setUser(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    } 
 
    return(
        <div className="home">
            <div className='signUp'>
                <h1>Sign up to BookStore</h1>
            <input id="name" placeholder="username" name="name" type="text" value={user.name} onChange={handleChange}/>
            <input id="email" placeholder="example@mail.com" name="email" type="text" value={user.email} onChange={handleChange}/>
            <input id="phoneNumber" placeholder="phoneNumber" name="phoneNumber" type="text" value={user.phoneNumber} onChange={handleChange}/>
            <input id="img" placeholder="imgURL" name="img" type="text" value={user.img} onChange={handleChange}/><br/>
            <button onClick={()=>{
                props.addUser(user)
                navigate(`/profile/${user.email}`);
                }}>Sign-Up</button>
            </div>
            {show && <div className='login'>
                <h1>Sign-In to BookStore</h1>
                <label htmlFor="email"></label>
                <input id="email" placeholder="example@mail.com" name="email" type="text" value={sigIn} onChange={(e)=>setSignIn(e.target.value)}/><br/>
                <button onClick={()=>{
                    props.setPerson(sigIn)
                    navigate(`/profile/${sigIn}`)
                }}>Submit</button>
            </div>}
            {!show && <button className="bu" onClick={()=>setShow(!show)}>Sign-In</button>}
        </div>
    )
}
export default Home;
