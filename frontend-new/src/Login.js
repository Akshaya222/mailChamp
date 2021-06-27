import React,{useState} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import {navigate,Link} from "@reach/router";
import axios from "axios";
import "./styles.css";
import { GoogleLogin } from 'react-google-login';

function LoginForm() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [msg,setMsg]=useState("");

  const responseGoogle=(response)=>{
    console.log("from google",response)
    axios.put("https://nodejs-mailchamp-2233.herokuapp.com/auth/login-google",{
        name:response.profileObj.name,username:response.profileObj.email,googleId:response.googleId
    }).then((res)=>{
      setMsg("");
      setErr("");
      setMsg(res.data.message);
      sessionStorage.setItem("user",JSON.stringify(res.data.data))
      setTimeout(()=>{navigate("/")},3000)
      console.log(res.data.message)
  }).catch((err)=>{
      setMsg("");
      setErr("");
      setErr(err.response.data.message)
      console.log(err.response.data.message);
  })
}

const handleSubmit=(e)=>{
  e.preventDefault();
  axios.put("https://nodejs-mailchamp-2233.herokuapp.com/auth/login-username",{
     username:email,password
  }).then((res)=>{
    setMsg("");
    setErr("");
    sessionStorage.setItem("user",JSON.stringify(res.data.data))
    setMsg(res.data.message);
    setTimeout(()=>{navigate("/")},3000)
    console.log(res.data.message)
}).catch((err)=>{
    setMsg("");
    setErr("");
    setErr(err.response.data.message)
    console.log(err.response.data.message);
})
}

  return (
   <div className="card-container">
    <div className="card">
      {/* {console.log(state)} */}

      <Card className="card-body">
        <CardContent>
          <Typography variant="h4">Login</Typography>
          <br />
          <Typography variant="h6" align="center" style={{color:'green',margin:msg?'3px 0px':null}}>{msg?msg:null}</Typography>
          <Typography variant="h6" align="center" style={{color:'red',margin:err?'3px 0px':null}}>{err?err:null}</Typography>
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
            <br />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <br />
            <br />
            <CardActions style={{display:'flex',justifyContent:'center'}}>
              <Button
                className="loginBtn"
                type="submit"
                variant="contained"
                color="secondary"
                size="small"
                // onSubmit={handleSubmit}
              >
                Login
              </Button>
            </CardActions>
          </form>
          <Typography className="or" variant="caption" color="textSecondary">
            or
          </Typography>
          <br />
          <br />

          <GoogleLogin
    cssClass="googleBtn"
    type="light"
    clientId="211311076662-q353q6o57djfc7c8mnnktam79n1d8dk7.apps.googleusercontent.com"
    buttonText="Sign up with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}/>
          <Typography className="signup" color="textSecondary">
            Don't have an account?
            <br />
            <Link to="/register"> Sign Up </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}

export default LoginForm;