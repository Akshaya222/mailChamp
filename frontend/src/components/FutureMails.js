import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { calculate } from './helpers/calculate';
import {Paper,makeStyles,Box} from '@material-ui/core';
import './navbar.css';

const useStyles=makeStyles({
    paper:{
        //width:'46%',
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
    useEffect(()=>{
        axios.get("http://localhost:3007/auth/getRecurringMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setRecMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })

        axios.get("http://localhost:3007/auth/getRecurringMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            const {prev,future}=calculate(res.data.data,30);
            setRecMails(future);
        }).catch((e)=>{
            console.log("error",e);
        })
    },[])
    return (
        <div>
            
        </div>
    )
}

export default FutureMails
