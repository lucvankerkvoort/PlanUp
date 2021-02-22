import {db} from '../../firebase'

export const eventAdd=(title,selectInfo)=>{
    db.collection('events')
    .add({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
    }).then(
      res=>{
        db.collection('events')
        .doc(res.id)
        .set({
          id:res.id,
          title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        })
      }
    )
}

export const eventChange=(changedInfo)=>{
    db.collection('events')
    .doc(changedInfo.event.id)
    .set({
            id:changedInfo.event.id,
            title:changedInfo.event.title,
            start: changedInfo.event.startStr,
            end: changedInfo.event.endStr,
            allDay: changedInfo.event.allDay,
          })
}

export const eventRemove=(id)=>{
    db.collection('events')
    .doc(id).delete()
}