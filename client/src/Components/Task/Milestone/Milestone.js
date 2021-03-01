import React,{useState} from 'react'
import { Button} from '@material-ui/core'
import axios from '../../../axios'
import "./Milestone.css"

const Milestone = ({ milestone,user,taskId }) => {
    const [loading,setLoading]=useState(false)

    const startMilestone= async ()=>{
        setLoading(true)
        await axios({
            method: 'post',
            url: '/tasks/milestone/start',
            data: {
                uid: user?.uid,
                taskId,
                milestoneId:milestone.id
            }
        })
        setLoading(false)
    }
    const stopMilestone= async ()=>{
        setLoading(true)
        await axios({
            method: 'post',
            url: '/tasks/milestone/stop',
            data: {
                uid: user?.uid,
                taskId,
                milestoneId:milestone.id
            }
        })
        setLoading(false)
    }
    const completeMilestone= async ()=>{
        setLoading(true)
        await axios({
            method: 'post',
            url: '/tasks/milestone/complete',
            data: {
                uid: user?.uid,
                taskId,
                milestoneId:milestone.id
            }
        })
        setLoading(false)
    }
    return (
        <div key={milestone.id} className="milestone-block">
            <h3>{milestone.data.title}</h3>
            <p>Time-{Math.floor((milestone.data.time) / 3600)} hr {Math.floor(((milestone.data.time)%3600)/ 60)} mins</p>
            {
                milestone.data.complete?<p>Completed</p>:
               <>{ milestone.data.running ?
                    <Button color='secondary' disableElevation size='small' variant='contained' onClick={stopMilestone} disabled={loading}>Stop</Button> :
                    <>
                    <Button color='primary' disableElevation size='small' variant='contained' onClick={startMilestone} disabled={loading}>Start</Button>
                    <Button color='primary' disableElevation size='small' variant="outlined" onClick={completeMilestone} disabled={loading}>Complete</Button>
                    </>}</>
            }
        </div>
    )
}

export default Milestone
