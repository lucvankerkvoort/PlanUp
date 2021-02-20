import React from 'react'
import {auth} from "../../firebase"
import "./Header.css"
import { Button } from '@material-ui/core'

const Header = ({installable,handleInstall,user}) => {
    
    const handleLogout=()=>{
        auth.signOut();
    }
    return (
        <div className="header">
            {installable?<Button color='primary' disableElevation size='small' variant='contained' onClick={handleInstall}>Install</Button>:<></>}
            {user?<Button color='secondary' disableElevation size='small' variant='contained' onClick={handleLogout}>Logout</Button>:<p>Login to view</p>}
        </div>
    )
}

export default Header;
