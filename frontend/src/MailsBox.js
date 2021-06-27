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

const MailsBox = () => {
    const classes=useStyles();
    const [recMails,setRecMails]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3007/auth/getRecurringMails/60d5981f4d6bb9419ccc539d").then((res)=>{
            console.log("mails",res.data.data);
            let {prev,future}=calculate(res.data.data,9000);
            console.log("calculate",prev,future);
            setRecMails(res.data.data);
        }).catch((e)=>{
            console.log("error",e);
        })
    },[])
    if(!recMails){
          return (
              <div>Loading....</div>
          )     
    }
    else{
        let date;
        return (
          <div>
            <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
               {
                   
                    recMails.map((mail)=>{
                        console.log(mail.createdAt);
                        if(mail.createdAt){
                        date=new Date(mail.createdAt);
                        }
                        return ( 
                   <div>
                        <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper>  
                    <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                        <div style={{opacity:"0"}}>
                        {
                           date?date.setSeconds(date.getSeconds()+30):null
                        }
                        </div>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper>  
                    <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                        <div style={{opacity:"0"}}>
                        {
                           date?date.setSeconds(date.getSeconds()+30):null
                        }
                        </div>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper>  
                    <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                        <div style={{opacity:"0"}}>
                        {
                           date?date.setSeconds(date.getSeconds()+30):null
                        }
                        </div>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper>  
                    <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                        <div style={{opacity:"0"}}>
                        {
                           date?date.setSeconds(date.getSeconds()+30):null
                        }
                        </div>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper>  
                    <Paper className={classes.paper}>
                        <Box component="div" display="flex" justifyContent="space-between" style={{margin:'5px'}}>
                        <p className="repeats">Repeats : {mail.type}</p>
                        <div style={{opacity:"0"}}>
                        {
                           date?date.setSeconds(date.getSeconds()+30):null
                        }
                        </div>
                         <p>At {date?date.toString():null}</p>
                        </Box>
                        <p className="text"><span className="text__name">To</span> : {mail.to}</p>
                        <p className="text"><span className="text__name">Cc</span> : {mail.cc}</p>
                        <p className="text"><span className="text__name">Subject</span> : {mail.subject}</p>
                        <p className="text message"><span className="text__name">Message</span> : {mail.body} </p>
                    </Paper> 
                    <h1>Weekly</h1>
            <div>
                {
                    date? new Date().toISOString()>date.toISOString() ? 'true':'false' :null
                }

            </div> 
                   </div>   
                    )
                    })
               }
            </div>
            <h1>Weekly</h1>
            <div>

            </div>
            </div>
        )
    }
}

export default MailsBox
