import React,{useState} from 'react'
import {auth} from "../../firebase";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signIn=()=>{
       
        auth.signInWithEmailAndPassword(email,password)
            .then(auth=>{
                alert("Done")
            })
            .catch(error=>alert(error.message));
    }
    const register=()=>{
        
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                alert("Done")
            })
            .catch(error=>alert(error.message));

    }
    return (
        <div>
            <h5>E-mail</h5>
                    <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button className="login-sign-in-button" onClick={signIn}>Sign in</button>
                    <button className="login-sign-up-button" onClick={register}>Register</button>
        </div>
    )
}

export default Login;
