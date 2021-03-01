import React from 'react'
import "./Tasks.css"
import { Button } from "@material-ui/core"
import { useHistory } from 'react-router-dom'

const Tasks = ({ user,tasks }) => {
    const history = useHistory()
    return (
        <div>
            {
                tasks.map((task) => {
                    return (<div className="task-block" key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.start}--{task.end}</p>
                        <p>Total time-{Math.floor((task.totalTime) / 3600)} hr {Math.floor(((task.totalTime)%3600)/ 60)} mins</p>
                        <Button color='primary' disableElevation size='small' variant='contained' onClick={() => history.push(`task?taskId=${task.id}`)}>Track</Button>
                    </div>)
                })
            }
        </div>
    )
}

export default Tasks
