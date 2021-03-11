import React from 'react'
import { TextField} from "@material-ui/core"

const RepEventInputs = ({ values, setValues }) => {
    return (<>
            <div style={{display:"flex",justifyContent:"space-between",width:"70%",marginTop:"10px",marginBottom:"10px"}}>
            <TextField
                label="Start Time"
                type="time"
                value={values.startTime}
                onChange={(e)=>setValues.setStartTime(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <TextField
                label="End Time"
                type="time"
                value={values.endTime}
                onChange={(e)=>setValues.setEndTime(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                />
            </div>
            <TextField
                label="Start Date"
                type="date"
                value={values.startDate}
                onChange={(e)=>setValues.setStartDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            <TextField
                label="End Date"
                type="date"
                value={values.endDate}
                onChange={(e)=>setValues.setEndDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </>
    )
}

export default RepEventInputs
