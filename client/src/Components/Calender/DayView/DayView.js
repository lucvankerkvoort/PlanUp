import React from 'react'
import Calender from '../Calender'

const DayView = ({user,currentEvents}) => {
    return (
        <div>
            <Calender view={"timeGridDay"} user={user} currentEvents={currentEvents} />
        </div>
    )
}

export default DayView;
