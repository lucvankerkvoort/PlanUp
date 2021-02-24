import React from 'react'
import Calender from '../Calender'

const WeekView = ({user,currentEvents}) => {
    return (
        <div>
            <Calender view={"timeGridWeek"} user={user} currentEvents={currentEvents} />
        </div>
    )
}

export default WeekView;
