import React, { useEffect, useState } from "react";
import axios from "axios";
import Allbooks from "./AllBooks";
import Posts from "./Posts";
const Profile=(props)=>{
    
    const [oneUser,setOneUser]=useState([])
    const [showProfile,setShowProfile]=useState(false)
    const [id,setId]=useState(null)
    console.log(oneUser)
    const getOne=()=>{
        axios.get(`http://localhost:5000/user/${props.person}`)
        .then(res=>setOneUser(res.data))  
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getOne()
    },[])

    return(
        <div >
            <div className="all">
                <button className="showButton" onClick={()=>{
                    setShowProfile(!showProfile)
                    setId(oneUser[0].iduser)
                    }}>Show profile</button>
                {showProfile && <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={oneUser[0].name} style={{width:"120px"}} />
                    <h1>{oneUser[0].name}</h1>
                    <p>{oneUser[0].email}</p>
                    <p>{oneUser[0].phoneNumber}</p>
                    <Posts id={oneUser[0].iduser}/>
                    </div>}
            </div>
            <div className="allbooks">
                <Allbooks id={id}/>
            </div>
            
        </div>
    )
        
};
export default Profile;

