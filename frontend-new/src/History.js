import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { calculate } from './helpers/calculate';
import {Paper,makeStyles,Box} from '@material-ui/core';
import './navbar.css';
import Navbar from "./Navbar";
const useStyles=makeStyles({
    paper:{
        width:'46%',
        padding:'20px',
        lineHeight:'23px',
        background:'#444',
        color: '#EDEDED',
        // margin:'15px',
        margin: 'auto',
        marginBottom: '15px',
        textAlign: 'center'
    }
})


const History = () => {
    const classes=useStyles();
    const [recMails,setRecMails]=useState([]);
    const [weeklyMails,setWeeklyMails]=useState([]);
    const [monMails,setMonMails]=useState([]);
    const [yeaMails,setYeaMails]=useState([]);
    useEffect(()=>{
        let user=JSON.parse(sessionStorage.getItem("user"))
        axios.get(` 
        https://nodejs-mailchamp-2233.herokuapp.com/auth/getRecurringMails/${user._id}`).then((res)=>{
            console.log("helloooo");
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setRecMails(prev);
        }).catch((e)=>{
            console.log("error",e);
        })

        axios.get(` 
        https://nodejs-mailchamp-2233.herokuapp.com/auth/getWeeklyMails/${user._id}`).then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,604800);
            setWeeklyMails(prev);
        }).catch((e)=>{
            console.log("error",e);
        })
        
        axios.get(` 
        https://nodejs-mailchamp-2233.herokuapp.com/auth/getMonthlyMails/${user._id}`).then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,2628000);
            setMonMails(prev);
        }).catch((e)=>{
            console.log("error",e);
        })
        axios.get(` 
        https://nodejs-mailchamp-2233.herokuapp.com/auth/getYearlyMails/${user._id}`).then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,31540000);
            setYeaMails(prev);
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
            <Navbar />
                <h1 style={{color:'#fff'}}>{recMails?"Recurring mails":null}</h1>
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
                <h1 style={{color:'#fff'}}>{weeklyMails?"Weekly mails":null}</h1>
                <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                {
                       weeklyMails.map((mail)=>{
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

                <h1 style={{color:'#fff'}}>{monMails?"Monthly mails":null}</h1>
                <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                {
                    monMails.map((mail)=>{
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

                <h1 style={{color:'#fff'}}>{yeaMails?"Yearly mails":null}</h1>
                <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                {
                    yeaMails.map((mail)=>{
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

export default History

