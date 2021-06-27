import React,{useEffect,useState} from 'react';
import {Box,Typography,Button,makeStyles} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link,navigate} from '@reach/router';

import './navbar.css';

const useStyles=makeStyles({
    button:{
        color:"#da0037" ,
        border:"1px solid  #da0037",
        marginLeft:'30px',
        fontSize:'17px'
    },
    icon:{
        fontSize:'30px',
        marginRight:'10px'
    }
})

const Navbar = () => {

    const classes=useStyles();
    const [user,setUser]=useState("");

    const logoutHandler=()=>{
        sessionStorage.removeItem("user");
        navigate("/login");
    }

    useEffect(()=>{
        let user=JSON.parse(sessionStorage.getItem("user"));
        if(user){
            setUser(user.name);
        }
    },[])

    return (
       <Box className="navbar" component="div" display="flex" alignItems="center" justifyContent="space-between">
           <ul className="navbar__list">
               <li className="navbar__item">
                   <Link to="/" className="navbar__link">Home</Link>
               </li>
               <li className="navbar__item">
                   <Link to="history" className="navbar__link">History</Link>
               </li>
           </ul>
           <Box component="div" display="flex" alignItems="center">
             <Typography variant="h6" className="navbar__user">
                 <AccountCircleIcon className={classes.icon}/>{user?user:"Should login"}
             </Typography>
             <Button className={classes.button} onClick={logoutHandler}>Logout</Button>
           </Box>
       </Box>
    )
}

export default Navbar
