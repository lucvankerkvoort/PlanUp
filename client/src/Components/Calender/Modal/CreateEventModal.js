import React, { useEffect, useState } from 'react'
import { Modal, Button, TextField, Switch, InputLabel} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import RadioButtons from "../EventInputs/RadioButtons";
import EventRepeatation from '../EventInputs/EventRepeatation';
import NonRepEventInputs from '../EventInputs/NonRepEventInputs';
import RepEventInputs from '../EventInputs/RepEventInputs';



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

const marginTop={
    marginTop:"10px"
}



const CreateEventModal = ({ open, setOpen, selectedInfo, eventAdd, user }) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [title, setTitle] = useState("")
    const [selectedValue, setSelectedValue] = useState('default')
    const [startStr, setStartStr] = useState(selectedInfo?.startStr);
    const [endStr, setEndStr] = useState(selectedInfo?.endStr);
    const [allDay, setAllDay] = useState(selectedInfo?.allDay ? true : false);
    const [repeat, setRepeat] = useState("Once")
    const [startTime,setStartTime] = useState("")
    const [endTime,setEndTime] = useState("")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")

    useEffect(() => {
        setStartStr(selectedInfo?.startStr)
        setEndStr(selectedInfo?.endStr)
        setStartTime(selectedInfo?.start?.toTimeString().substring(0,5))
        setEndTime(selectedInfo?.end?.toTimeString().substring(0,5))
        setAllDay(selectedInfo?.allDay ? true : false)
    }, [selectedInfo])
    
    return (
        <Modal
            open={open}
            onClose={() => {
                setTitle('')
                setSelectedValue("default")
                setOpen(false)
            }}
        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <TextField label="Title" style={{ marginBottom: "5px" }} value={title} onChange={e => setTitle(e.target.value)} />
                    <div style={marginTop}>
                        <InputLabel shrink>Color</InputLabel>
                        <RadioButtons selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
                    </div>
                    <div style={marginTop}>
                        <InputLabel shrink>All Day: </InputLabel>
                        <Switch checked={allDay} onChange={() => setAllDay(prevState => !prevState)} />
                    </div>
                    <div style={marginTop}>
                        <EventRepeatation repeat={repeat} setRepeat={setRepeat}/>
                    </div>

                    {repeat==="Once"?
                    <div style={marginTop}>
                        <NonRepEventInputs endStr={endStr} startStr={startStr} setEndStr={setEndStr} setStartStr={setStartStr}/>
                    </div>:
                    <div>
                        <RepEventInputs values={{startTime,endTime,startDate,endDate}} setValues={{setStartTime,setEndTime,setStartDate,setEndDate}}/>
                    </div>
                        }
                    <Button color='secondary' style={marginTop} disableElevation size='small' variant='contained' onClick={() => {
                        if (title) {
                            eventAdd(repeat,{ title, startStr, endStr, color: selectedValue, allDay,startTime,endTime,startDate,endDate }, user)
                            setOpen(false)
                            setSelectedValue("default")
                            setTitle('')
                        }
                    }}>Create</Button>
                </div>
            </div>
        </Modal>


    )
}

export default CreateEventModal;