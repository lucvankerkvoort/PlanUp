import React from 'react'
import { TextField, InputLabel} from "@material-ui/core"

const NonRepEventInputs = ({startStr,endStr,setStartStr,setEndStr}) => {
    return (
        <>
            <InputLabel shrink>Start: </InputLabel>
            <TextField value={getTime(startStr)} onChange={e => setStartStr(e.target.value)} type="datetime-local" placeholder="Start" />
            <InputLabel shrink>End: </InputLabel>
            <TextField value={getTime(endStr)} onChange={e => setEndStr(e.target.value)} type="datetime-local" placeholder="End" />
        </>
    )
}

export default NonRepEventInputs

const getTime = (time) => {
    if (time)
        return time.length >= 16 ? time.substring(0, 16) : time.concat("T00:00")
    else
        return "2021-01-01T00:00"
}