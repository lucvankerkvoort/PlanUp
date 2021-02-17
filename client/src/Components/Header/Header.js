import React from 'react'
import {auth} from "../../firebase"

const Header = () => {
    const handleLogout=()=>{
        auth.signOut();
    }
    return (
        <div className="header">
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Header;
