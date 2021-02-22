import React, { useState } from 'react'
import { Modal, Button, Radio, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { withStyles } from '@material-ui/core/styles';



const RedRadio = withStyles({
    root: {
        color: "red",
        '&$checked': {
            color: "red",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const DefaultRadio = withStyles({
    root: {
        color: "#3788d8",
        '&$checked': {
            color: "#3788d8",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const GreenRadio = withStyles({
    root: {
      color: 'green',
      '&$checked': {
        color: 'green',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

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



const CreateEventModal = ({ open, setOpen, selectedInfo,eventAdd }) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [title, setTitle] = useState("")
    const [selectedValue, setSelectedValue] = useState('default')

    return (
        <Modal
            open={open}
            onClose={() => {
                setTitle('')
                setSelectedValue("default")
                setOpen(false)}}
        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

                    <TextField label="Title" style={{ marginBottom: "5px" }} value={title} onChange={e => setTitle(e.target.value)} />
                    <div style={{display:"flex", alignItems: "center"}}>
                        <span style={{color:"#"}}>Color:</span>
                    <DefaultRadio
                        checked={selectedValue === 'default'}
                        onChange={(event) => {
                            setSelectedValue(event.target.value);
                          }}
                        value="default"
                        name="radio-button-demo"
                        label="Default"
                    />
                    <GreenRadio
                        checked={selectedValue === 'green'}
                        onChange={(event) => {
                            setSelectedValue(event.target.value);
                          }}
                        value="green"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'B' }}
                        label="Important"
                    />
                    <RedRadio
                        checked={selectedValue === 'red'}
                        onChange={(event) => {
                            setSelectedValue(event.target.value);
                          }}
                        value="red"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                        label="Urgent"
                    />

                    </div>
                    <Button color='secondary' disableElevation size='small' variant='contained' onClick={() => {
                        if(title){
                            
                            eventAdd(title,selectedInfo,selectedValue)
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
