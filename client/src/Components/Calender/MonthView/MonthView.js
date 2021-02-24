import React from 'react'
import Calender from '../Calender'

const MonthView = ({user,currentEvents}) => {
    return (
        <div>
            <Calender view={"dayGridMonth"} user={user} currentEvents={currentEvents} />
        </div>
    )
}

export default MonthView;
