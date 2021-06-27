import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { calculate } from '../helpers/calculate';
import {Paper,makeStyles,Box} from '@material-ui/core';
import '../navbar.css';

const useStyles=makeStyles({
    paper:{
        width:'46%',
        padding:'20px',
        lineHeight:'23px',
        background:'#444',
        color: '#EDEDED',
        margin:'15px'
    }
})


const FutureMails = () => {
    const classes=useStyles();
    const [recMails,setRecMails]=useState([]);
    const [weeklyMails,setWeeklyMails]=useState([]);
    const [monMails,setMonMails]=useState([]);
    const [yeaMails,setYeaMails]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3007/auth/getRecurringMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("helloooo");
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,9000);
            setRecMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })

        axios.get("http://localhost:3007/auth/getWeeklyMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setWeeklyMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })
        
        axios.get("http://localhost:3007/auth/getMonthlyMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setMonMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })
        axios.get("http://localhost:3007/auth/getYearlyMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setYeaMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })
    },[])
    if(!recMails){
       return(
        <h1>Loading...</h1>
       )
    }
    else{
        return (
            <div>
                <h1 style={{color:'#fff'}}>Recurring mails</h1>
                <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                {
                       recMails.map((mail)=>{
                           console.log(mail.createdAt);
                           let date;
                           if(mail.createdAt){
                            date=new Date(mail.createdAt);
                            date.setSeconds(date.getSeconds()+Number(mail.time));
                           }
                           return ( 
                            <Paper className={classes.paper}>
                            {/* <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}> */}
                            <p className="repeats text">Repeats : {mail.type}</p>
                            <p className="text" ><span className="text__name">At</span>: {date?date.toString():null}</p>
                            {/* </Box> */}
                            <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                            <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                            <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                            <p className="text message"><span className="text__name">Message</span> : {mail.message} </p>
                        </Paper>  
                           )
                })
            }
                </div>
            </div>
        )
    }
}

export default FutureMails
