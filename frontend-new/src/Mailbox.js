import React from 'react';
import {Paper,makeStyles,Box} from '@material-ui/core';
import './navbar.css';

const useStyles=makeStyles({
    paper:{
        width:'33%',
        padding:'20px',
        lineHeight:'23px',
        background:'#444',
        color: '#EDEDED',
        margin:'15px'
    }
})

const Mailbox = () => {
    const classes=useStyles();
    return (
       <div style={{display:'flex'}}>
        <Paper className={classes.paper}>
            <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
            <p className="repeats">Repeats : Weekly</p>
            <p>At 12/23/45 6.00pm</p>
            </Box>
            <p className="text"><span className="text__name">To</span> : bhavyatripathi00</p>
            <p className="text"><span className="text__name">Cc</span> : 18bcs017@iiitdwd</p>
            <p className="text"><span className="text__name">Subject</span> : sending recurring mails</p>
            <p className="text message"><span className="text__name">Message</span> : In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </p>
        </Paper>
        <Paper className={classes.paper}>
            <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
            <p className="repeats">Repeats : Weekly</p>
            <p>At 12/23/45 6.00pm</p>
            </Box>
            <p>To : bhavyatripathi00</p>
            <p>Cc : 18bcs017@iiitdwd</p>
            <p>Subject : sending recurring mails</p>
            <p>Message : In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </p>
        </Paper>
        <Paper className={classes.paper}>
            <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
            <p className="repeats">Repeats : Weekly</p>
            <p>At 12/23/45 6.00pm</p>
            </Box>
            <p>To : bhavyatripathi00</p>
            <p>Cc : 18bcs017@iiitdwd</p>
            <p>Subject : sending recurring mails</p>
            <p>Message : In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </p>
        </Paper>
       </div>
    )
}

export default Mailbox
