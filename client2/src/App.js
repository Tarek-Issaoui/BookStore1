import {  useState } from 'react';
import axios from 'axios';
import './App.css';
import Profile from './component/Profile';

import {Route,Routes} from 'react-router-dom'
import Home from './component/Home';
function App() {
  
  
  const [person,setPerson]=useState('')
 
  
  const addUser=async(user)=>{
    await axios.post('http://localhost:5000/user',user)
    setPerson(user.email)
}

  


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home addUser={addUser} setPerson={setPerson} />}/>
        <Route path={`/profile/${person}`} element={<Profile person={person} />}/>
      </Routes>

    </div>
  );
}

export default App;
