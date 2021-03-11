import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import "./Calender.css";
import EventModal from './Modal/EventModal'
import CreateEventModal from './Modal/CreateEventModal'
import { eventAdd, eventChange } from './eventfunctions'


const Calender = ({ currentEvents, user,view }) => {
  const [selectedEvent, setSelectedEvent] = useState({});
  // eslint-disable-next-line
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState(undefined)
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
    eventChange(changedInfo, user)
  }
  
  return (
    <div className="calender-app">
      <CreateEventModal open={open2} user={user} eventAdd={eventAdd} selectedInfo={selectedInfo} setOpen={setOpen2} />
      <EventModal open={open} user={user} selectedEvent={selectedEvent} setOpen={setOpen} />
      <div className="calender-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
          contentHeight={600}
          selectLongPressDelay={1000}
          headerToolbar={{
            left:'title prev next',
            center: '',
            end: 'today'
          }}
          googleCalendarApiKey={process.env.REACT_APP_GOOGLE_CALENDER_API}
          buttonText={{
            today:    'Today'
          }}
          initialView={view}
          titleFormat={{ // will produce something like "Tuesday, September 18, 2018"
            month: 'short',
            year: 'numeric',
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={[...currentEvents]}
          //eventSources={[{googleCalendarId:user.email,editable:false},currentEvents]}
          eventSourceFailure={err=>console.log(err)}
          eventSourceSuccess={(content, xhr)=>console.log(content)}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>
    </div>
  )
}

export default Calender;
