import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { db } from "../../firebase"
import { Button, Input } from '@material-ui/core'
import axios from '../../axios'
import "./Task.css"
import Milestone from "./Milestone/Milestone"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Task = ({ user, tasks }) => {
    const query = useQuery()
    const [milestoneTitle, setMilestoneTitle] = useState('')
    const [milestoneStart, setMilestoneStart] = useState('')
    const [milestoneEnd, setMilestoneEnd] = useState('')
    const [milestones, setMilestones] = useState([])
    const [processing, setProcessing] = useState(false)

    const taskId = query.get('taskId')
    const currentTask = tasks.filter((task) => task.id === taskId)

    useEffect(() => {
        db.collection(`users/${user?.uid}/tasks/${taskId}/milestone`).onSnapshot(
            snapshot => {
                setMilestones(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                }))
            }
        )
    }, [user, taskId])

    const handleAddMilestone = async () => {
        setProcessing(true)
        await axios({
            method: 'post',
            url: '/tasks/milestone',
            data: {
                uid: user?.uid,
                taskId,
                milestoneTitle,
                milestoneStart,
                milestoneEnd,
            }
        })
        setProcessing(false)
        setMilestoneStart("")
        setMilestoneTitle("")
        setMilestoneEnd("")
    }


    return (
        <div>
            <h1>Tasks</h1>

            <div className="task-block" key={currentTask[0]?.id}>
                <h2>{currentTask[0]?.title}</h2>
                <p>{currentTask[0]?.start}--{currentTask[0]?.end}</p>
                <p>Total time-{Math.floor((currentTask[0]?.totalTime) / 3600)} hr {Math.floor(((currentTask[0]?.totalTime)%3600)/ 60)} mins</p>
                <div className="milestones">
                    {
                        milestones.map((milestone) => {
                            return (<Milestone user={user} taskId={taskId} milestone={milestone} key={milestone.id}/>)
                        })
                    }
                </div>
                <div className="milestone-add">
                    <Input value={milestoneTitle} onChange={e => setMilestoneTitle(e.target.value)} placeholder="Title" type="text" />
                    <Input value={milestoneStart} onChange={e => setMilestoneStart(e.target.value)} type="datetime-local" placeholder="Start" />
                    <Input value={milestoneEnd} onChange={e => setMilestoneEnd(e.target.value)} type="datetime-local" placeholder="End" />
                    <Button color='primary' disableElevation size='small' variant='contained' disabled={processing} onClick={handleAddMilestone}>Add Milestone</Button>
                </div>
            </div>
        </div>
    )
}

export default Task
