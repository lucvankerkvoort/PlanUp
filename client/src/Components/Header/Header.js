import React from 'react'
import { auth } from "../../firebase"
import "./Header.css"
import { Button } from '@material-ui/core'
import { Event, ViewDay, DateRange } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const Header = ({ installable, handleInstall, user }) => {
    const history = useHistory()
    const handleLogout = () => {
        auth.signOut();
    }
    return (
        <div className="header">
            <div>
                {installable ? <Button color='primary' disableElevation size='small' variant='contained' onClick={handleInstall}>Install</Button> : <></>}
                {user ? <Button color='secondary' disableElevation size='small' variant='contained' onClick={handleLogout}>Logout</Button> : <p>Login to view</p>}
            </div>
            <div>
                <Event style={{marginLeft:"3px"}} onClick={() => history.push('month-view')} color="primary" />
                <ViewDay style={{marginLeft:"3px"}} onClick={() => history.push('day-view')} color="primary" />
                <DateRange style={{marginLeft:"3px"}} onClick={() => history.push('week-view')} color="primary" />
            </div>
        </div>
    )
}

export default Header;
