import React,{useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [number,setNumber]=useState("");
    const [otp,setOtp]=useState("")

    const responseGoogle=(response)=>{
        axios.post("http://localhost:3007/auth/signup-google",{
            name:response.profileObj.name,username:response.profileObj.email,googleId:response.googleId
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }

    const responseFacebook=(response)=>{
        console.log("from favebook",response)
        axios.post("http://localhost:3007/auth/signup-fb",{
            name:response.name,username:response.email,fbId:response.userID
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3007/auth/signup-username",{
            name,username:email,password
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }

    const sendOtp=()=>{
        axios.post("http://localhost:3007/auth/sendOtp",{
            phoneNumber:number
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }
    const verifyOtp=()=>{
        axios.post("http://localhost:3007/auth/verifyOtp",{
           phoneNumber:number,
           otp
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }

    const mobileSignUp=()=>{
        axios.post("http://localhost:3007/auth/signup-mobile",{
           phoneNumber:number
        }).then((res)=>{
            console.log(res.data.message)
        }).catch((err)=>{
            console.log(err.response.data.message);
        })
    }


    return (
        <div>
             <h1>Sign up</h1>
            <input value={name} placeholder="name" onChange={(e)=>setName(e.target.value)} />
            <input value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <input value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={submitHandler}>SignUp</button>

            <h1>Mobile</h1>
            <input value={number} type="tel" placeholder="number" onChange={(e)=>setNumber(e.target.value)}/>
            <button onClick={sendOtp}>get otp</button>
            <input value={otp} type="tel" placeholder="number" onChange={(e)=>setOtp(e.target.value)}/>
            <button onClick={verifyOtp}>verify otp</button>
            <button onClick={mobileSignUp}>SignUp</button>

            <h1>Facebook</h1>
            <FacebookLogin
    appId="123727169749017"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    textButton="Sign Up" />

    <h1>Google</h1>
    <GoogleLogin
    clientId="211311076662-q353q6o57djfc7c8mnnktam79n1d8dk7.apps.googleusercontent.com"
    buttonText="Sign Up"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}/>
        </div>
    )
}

export default SignUp
