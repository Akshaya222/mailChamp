const User=require('../models/user');
const {successHandler,failureHandler}=require("../helpers/response")
const {createHash}=require("../helpers/passwordHandler")
const {sendMail}=require("../helpers/nodemailer")
const {issueJwt}=require("../helpers/jwt");

exports.signUpWithUsername=async(req,res)=>{
   let err;
   let {name,username,password}=req.body
    if(!name || !username || !password){
        return failureHandler(res,"Missing Fields",400);
    }
   try{
    let user=await User.findOne({username:username});
    if(user){
        err=new Error("Username already exists,please login!");
        err.statusCode=400;
        throw err;
    }
    let {salt,hash}=createHash(password);
    let newUser=new User({name,username,salt,hash})
    user= await User.create(newUser)
    if(!user){
        err=new Error("Unable to register,try again!");
        err.statusCode=400;
        throw err;
    }
    let token=issueJwt(user._id);
    await User.findByIdAndUpdate(user._id,{token:token},{new:true},function(err,docs){
         if(err){
            err=new Error(err.message);
            err.statusCode=500;
            throw err;
         }
         else{
            return  successHandler(res,docs,200,"Registration Successfull!!")
         }
    })
   }
   catch(e){
    return failureHandler(res,e.message,e.statusCode)
   }
}

exports.signUpWithGoogle=async(req,res)=>{
    let err;
    let {googleId,name,username}=req.body;
    if(!googleId|| !name || !username){
        console.log("Missing Fields");
        return  failureHandler(res,"Missing Fields",400);
    }
    try{
        let user=await User.findOne({googleId});
        if(user){
            console.log("User already exists,please login!");
            err=new Error("User already exists,please login!");
            err.statusCode=400;
            throw err;
        }
        let newUser=new User({name,username,googleId})
        user= await User.create(newUser)
        if(!user){
            console.log("Unable to register,try again");
            err=new Error("Unable to register,try again");
            err.statusCode=500;
            throw err;
        }
        let token=issueJwt(user._id);
        await User.findByIdAndUpdate(user._id,{token:token},{new:true},function(err,docs){
             if(err){
                 console.log(err.message);
                 err=new Error(err.message);
                 err.statusCode=500;
                 throw err;
             }
             else{
                return successHandler(res,docs,200,"Registration Successfull!!")
             }
        })
       }
       catch(e){
        return failureHandler(res,e.message,e.statusCode)
       }
}



