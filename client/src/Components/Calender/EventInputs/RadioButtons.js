import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Radio } from "@material-ui/core";
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
const RadioButtons = ({selectedValue,setSelectedValue}) => {
    return (
        <>
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
        </>
    )
}

export default RadioButtons
