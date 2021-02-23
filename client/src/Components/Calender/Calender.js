import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./Calender.css";
import EventModal from './Modal/EventModal'
import CreateEventModal from './Modal/CreateEventModal'
import { eventAdd, eventChange } from './eventfunctions'

const Calender = ({currentEvents}) => {
  
  const [selectedEvent, setSelectedEvent] = useState({});
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedInfo,setSelectedInfo]=useState(undefined)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleDateSelect = (selectInfo) => {
    
    setOpen2(true)
    let calendarApi = selectInfo.view.calendar
  setSelectedInfo(selectInfo)
    calendarApi.unselect() // clear date selection

  }
   
  const handleEventClick = (clickInfo) => {
    setOpen(true)
    setSelectedEvent(clickInfo.event)
  }


  const handleEventChange = (changedInfo) => {
    eventChange(changedInfo)
  }

  return (
    <div className="calender-app">
      <CreateEventModal open={open2} eventAdd={eventAdd} selectedInfo={selectedInfo} setOpen={setOpen2}/>
      <EventModal open={open} selectedEvent={selectedEvent} setOpen={setOpen} />
      <div className="calender-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>
    </div>
  )
}

export default Calender;
