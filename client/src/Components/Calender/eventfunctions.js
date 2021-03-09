import {db} from '../../firebase'


const getEventObject=(repeat,selectInfo)=>{
  switch(repeat){
    case 'Once':
      return {
        title: selectInfo.title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor:selectInfo.color,
        borderColor:selectInfo.color
    }
    case 'Daily':{
      return {
        title: selectInfo.title,
        startTime: selectInfo.startTime,
        endTime: selectInfo.endTime,
        startRecur : selectInfo.startDate,
        endRecur: selectInfo.endTime,
        backgroundColor:selectInfo.color,
        borderColor:selectInfo.color,
        allDay:selectInfo.allDay,
      }
    }
    case 'Weekdays':{
      return {
        title: selectInfo.title,
        startTime: selectInfo.startTime,
        endTime: selectInfo.endTime,
        startRecur : selectInfo.startDate,
        endRecur: selectInfo.endTime,
        backgroundColor:selectInfo.color,
        borderColor:selectInfo.color,
        allDay:selectInfo.allDay,
        daysOfWeek:[1,2,3,4,5]
      }
    }
    case 'Weekends':{
      return {
        title: selectInfo.title,
        startTime: selectInfo.startTime,
        endTime: selectInfo.endTime,
        startRecur : selectInfo.startDate,
        endRecur: selectInfo.endTime,
        backgroundColor:selectInfo.color,
        borderColor:selectInfo.color,
        allDay:selectInfo.allDay,
        daysOfWeek:[0,6]
      }
    }
    default:{
        return {}
    }
  }
}

export const eventAdd=(repeat,selectInfo,user)=>{
    const eventObject=getEventObject(repeat,selectInfo);
    
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .add(eventObject).then(
      res=>{
        db.collection('users')
        .doc(user.uid)
        .collection('events')    
        .doc(res.id)
        .update({
          id:res.id,
        })
      }
    )
}

export const eventChange=(changedInfo,user)=>{
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .doc(changedInfo.event.id)
    .update({
            start: changedInfo.event.startStr,
            end: changedInfo.event.endStr,
            allDay: changedInfo.event.allDay,
          })
}

export const eventRemove=(id,user)=>{
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .doc(id).delete()
}