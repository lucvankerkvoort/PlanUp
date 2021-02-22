import React from 'react'
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { eventRemove } from '../eventfunctions'

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


const EventModal = ({open,setOpen,selectedEvent}) => {
    const classes = useStyles();
    
    const [modalStyle] = React.useState(getModalStyle);
    return (

        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <h3>{selectedEvent.title}</h3>
               
                    <p>Start:{selectedEvent.startStr}</p>
                <Button color='secondary' disableElevation size='small' variant='contained' onClick={()=>{
                    eventRemove(selectedEvent.id)
                    setOpen(false)
                }}>Delete</Button>
            </div>
        </Modal>

    )
}

export default EventModal
