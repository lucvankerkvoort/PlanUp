import React,{useEffect} from 'react'
import Calender from "./Components/Calender/Calender"
import Header from "./Components/Header/Header";
import './App.css';
import Login from "./Components/Login/Login";
import {auth} from "./firebase";
import {useStateValue} from "./Context/StateProvider";

function App() {
  const [{user},dispatch]=useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
         if (authUser){
            dispatch({
                type: 'SET_USER',
                user: authUser
            })
        }else {
            dispatch({
                type: 'SET_USER',
                user: null
            })
        }
    })
    // eslint-disable-next-line
},[])
  return (
    <div className="App">
      {user?<><Header/>
      <Calender/></>:<Login/>}
    </div>
  );
}

export default App;
