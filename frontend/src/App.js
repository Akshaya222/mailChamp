import React,{useState}from 'react';
import { Router } from "@reach/router";
import Navbar  from './Navbar';
import Home from './Home';
import History from './History';
import MailBox from './Mailbox';
import MailsBox from './MailsBox';
import Register from "./Register";
import Login from './Login';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {navigate} from '@reach/router';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  menuPaper: {
    maxHeight: 300
  }
}));

function App() {
 
  return (
    
    <div>
  <Router>
      <History path="/history" />
      <Register path="/register"/>
      <Login path="/login"/>
      <Home exact path="/"/>
   </Router>
   <MailsBox/>
    </div>
  );
}

export default App;
