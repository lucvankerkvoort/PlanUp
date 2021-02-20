import React,{useState} from 'react'
import {auth} from "../../firebase";
import { Button } from '@material-ui/core'
import './Login.css'

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
        <div className='login'>
            <div className='form'>

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
                    <div className='login-buttons'>

                    <Button color='primary' fullWidth disableElevation size='small' variant='contained'  onClick={signIn}>Sign in</Button>
                    <Button color='primary' fullWidth disableElevation size='small' variant='contained'  onClick={register}>Register</Button>
                    </div>
            </div>
        </div>
    )
}

export default Login;
