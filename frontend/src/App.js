import React,{useState}from 'react';
import { Router } from "@reach/router";
import Home from './Home';
import History from './History';
import Register from "./Register";
import Login from './Login';
import FutureMails from './components/FutureMails';


function App() {
 
  return (
    
    <div>
  <Router>
      <History path="/history" />
      <Register path="/register"/>
      <Login path="/login"/>
      <FutureMails path="/mails"/>
      <Home exact path="/"/>
   </Router>
    </div>
  );
}

export default App;
