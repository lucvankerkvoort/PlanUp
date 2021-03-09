import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"

const EventRepeatation = ({repeat,setRepeat}) => {
    return (
        <>
            <FormControl >
                <InputLabel shrink>
                    Repeat
                        </InputLabel>
                <Select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="Once">
                        <em>Once</em>
                    </MenuItem>
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekdays"}>Weekdays</MenuItem>
                    <MenuItem value={"Weekends"}>Weekends</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default EventRepeatation
