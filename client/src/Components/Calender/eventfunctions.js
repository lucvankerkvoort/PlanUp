import {db} from '../../firebase'

export const eventAdd=(title,selectInfo,color,user)=>{
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .add({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor:color,
        borderColor:color
    }).then(
      res=>{
        db.collection('users')
        .doc(user.uid)
        .collection('events')    
        .doc(res.id)
        .set({
          id:res.id,
          title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor:color,
        borderColor:color
        })
      }
    )
}

export const eventChange=(changedInfo,user)=>{
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .doc(changedInfo.event.id)
    .set({
            id:changedInfo.event.id,
            title:changedInfo.event.title,
            start: changedInfo.event.startStr,
            end: changedInfo.event.endStr,
            allDay: changedInfo.event.allDay,
            backgroundColor:changedInfo.event.backgroundColor,
            borderColor:changedInfo.event.borderColor
          })
}

export const eventRemove=(id,user)=>{
    db.collection('users')
    .doc(user.uid)
    .collection('events')
    .doc(id).delete()
}