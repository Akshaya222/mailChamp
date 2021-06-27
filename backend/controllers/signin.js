const User=require('../models/user');
const {successHandler,failureHandler}=require("../helpers/response")
const {verfiyPassword}=require("../helpers/passwordHandler")
const {issueJwt}=require("../helpers/jwt");

exports.signInWithUsername=async(req,res)=>{
   let err;
   let {username,password}=req.body
    if(!username || !password){
       return failureHandler(res,"Missing Fields",400);
    }
   try{
    let user=await User.findOne({username:username});
    if(!user){
        console.log("User not found,please register");
        err=new Error("User not found,please register");
        err.statusCode=404;
        throw err;
    }
    let valid=verfiyPassword(password,user.hash,user.salt)
    if(!valid){
        err=new Error("Incorrect password");
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
            return successHandler(res,docs,200,"Login Successfull!!")
         }
    })
   }
   catch(e){
    return failureHandler(res,e.message,e.statusCode)
   }
}


exports.signInWithGoogle=async(req,res)=>{
    let err;
    let {googleId,name,username}=req.body;
    if(!googleId|| !name || !username){
        return failureHandler(res,"Missing Fields",400);
    }  
    try{
        let user=await User.findOne({googleId})
    if(!user){
        err=new Error("User doesn't exist,please register");
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
            return  successHandler(res,docs,200,"Login Successfull!!")
         }
    })
    }
    catch(e){
        return failureHandler(res,e.message,e.statusCode)
    }
}

