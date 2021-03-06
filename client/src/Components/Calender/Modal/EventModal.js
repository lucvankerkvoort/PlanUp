import React,{useState} from 'react'
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { eventRemove } from '../eventfunctions'
import Moment from 'react-moment';
import axios from '../../../axios';
import {useHistory} from 'react-router-dom'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 280,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 2, 2),
    },
}))


const EventModal = ({ open, setOpen, selectedEvent,user }) => {
    const classes = useStyles()
    const [loading,setLoading]=useState(false)
    const history=useHistory()

    const handleTrack=async ()=>{
        setLoading(true)
        await axios({
            method:'post',
            url:'/tasks',
            data: {
                uid:user?.uid,
                eventId:selectedEvent?.id
              }
        })
        setLoading(false)
        history.push(`/task?taskId=${selectedEvent?.id}`)
    }
    const [modalStyle] = React.useState(getModalStyle);
    return (

        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <h3>{selectedEvent.title}</h3>

                <p>Start: <Moment format="llll">
                {selectedEvent.startStr}
            </Moment> </p>

                <p>End: <Moment format="llll">{selectedEvent.endStr}</Moment></p>

                <p>{selectedEvent.allDay ? "All Day Event":""}</p>

                <Button color='secondary' disabled={loading} disableElevation size='small' variant='contained' onClick={() => {
                    setLoading(true)
                    eventRemove(selectedEvent.id,user)
                    setLoading(false)
                    setOpen(false)
                }}>Delete</Button>
                
                <Button color='secondary'disabled={loading} disableElevation size='small' variant='contained' onClick={handleTrack}>Track</Button>

            </div>
        </Modal>

    )
}

export default EventModal
