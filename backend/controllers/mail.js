const {sendMail}=require('../helpers/nodemailer');
const {successHandler,failureHandler}=require("../helpers/response");
const User=require('../models/user');
const Mail=require('../models/mail');

function sendMails(res,{...options},time){
let counter=0;
const {transporter,mailOptions}=sendMail(options.to,options.subject,options.body,options.cc);
const interval=setInterval(()=>{
   if(counter>5){
      clearInterval(interval);
   }
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return failureHandler(res,error.message,error.statusCode);
      } else {
        if(counter===1){
          addToDatabase(res,options);
        }
      }
      })
      counter++;
},time)
}

async function addToDatabase(res,options){
   try{
      console.log(options);
      const user=await User.findById(options.user);
      let mail=new Mail(options);
       mail=await mail.save();
       if(!mail){
          err=new Error("Data updating failed");
          err.statusCode=500;
          throw err;
       }
       
       user.mails.push(mail._id);
       let userUpdated=await user.save();
       if(!userUpdated){
          err=new Error("Data updating failed");
          err.statusCode=500;
          throw err;
       }
        successHandler(res,userUpdated,200,"Mails sent successfully");
   }
   catch(e){
      return  failureHandler(res,e.message,e.statusCode);
   }

}

module.exports.recurringMail=async(req,res)=>{
      // userId will be in req.params.userId
   const user=await User.findById(req.params.userId);
   if(!user){
    return  failureHandler(res,"User not found",404); 
   }
   const {to,cc,subject,body}=req.body;
   if(!to || !cc || !subject || !body){
    return  failureHandler(res,"Missing fields",400);       
   }
   let options=Object.assign({},req.body);
   options.type="Recurring";
   options.user=req.params.userId;
   try{
        sendMails(res,{...options},30000);
   }
   catch(e){
    return  failureHandler(res,e.message,e.statusCode);
   }
}
module.exports.scheduleEveryWeek=async(req,res)=>{
//    604800000 ms
const user=await User.findById(req.params.userId);
if(!user){
 return  failureHandler(res,"User not found",404); 
}
const {to,cc,subject,body}=req.body;
if(!to || !cc || !subject || !body){
 return  failureHandler(res,"Missing fields",400);       
}
let options=Object.assign({},req.body);
options.type="Weekly";
options.user=req.params.userId;
try{
     sendMails(res,{...options},604800000);
}
catch(e){
 return  failureHandler(res,e.message,e.statusCode);
}
}

module.exports.scheduleEveryMonth=async(req,res)=>{
    // 2628000000 ms
    const user=await User.findById(req.params.userId);
if(!user){
 return  failureHandler(res,"User not found",404); 
}
const {to,cc,subject,body}=req.body;
if(!to || !cc || !subject || !body){
 return  failureHandler(res,"Missing fields",400);       
}
let options=Object.assign({},req.body);
options.type="Monthly";
options.user=req.params.userId;
try{
     sendMails(res,{...options},2628000000);
}
catch(e){
 return  failureHandler(res,e.message,e.statusCode);
}
    
}
module.exports.scheduleEveryYear=async(req,res)=>{
    // 31540000000 ms
    const user=await User.findById(req.params.userId);
if(!user){
 return  failureHandler(res,"User not found",404); 
}
const {to,cc,subject,body}=req.body;
if(!to || !cc || !subject || !body){
 return  failureHandler(res,"Missing fields",400);       
}
let options=Object.assign({},req.body);
options.type="Yearly";
options.user=req.params.userId;
try{
     sendMails(res,{...options},31540000000);
}
catch(e){
 return  failureHandler(res,e.message,e.statusCode);
}
}

exports.getRecurringMails=async(req,res)=>{
   let err;
   try{
   let user=await User.findById(req.params.userId);
   if(!user){
      err=new Error("User not found");
      err.statusCode=404;
      throw err;
   }
   User.findById(req.params.userId).populate("mails").then((users)=>{
      var filteredEvents = users.mails.filter(function(mail){
        return mail.type == 'Recurring';
     });
     return  successHandler(res,filteredEvents,200,"Data retrieval successfully");
  }).catch((err)=>{
   err=new Error("data retrival failed");
   err.statusCode=400;
   throw err;
  })
   }
   catch(e){
     return  failureHandler(res,e.message,e.statusCode);
   }
}
exports.getWeeklyMails=async(req,res)=>{
   let err;
   try{
   let user=await User.findById(req.params.userId);
   if(!user){
      err=new Error("User not found");
      err.statusCode=404;
      throw err;
   }
   User.findById(req.params.userId).populate("mails").then((users)=>{
      var filteredEvents = users.mails.filter(function(mail){
        return mail.type == 'Weekly';
     });
     return  successHandler(res,filteredEvents,200,"Data retrieval successfully");
  }).catch((err)=>{
   err=new Error("data retrival failed");
   err.statusCode=400;
   throw err;
  })
   }
   catch(e){
     return  failureHandler(res,e.message,e.statusCode);
   }
}
exports.getMonthlyMails=async(req,res)=>{
   let err;
   try{
   let user=await User.findById(req.params.userId);
   if(!user){
      err=new Error("User not found");
      err.statusCode=404;
      throw err;
   }
   User.findById(req.params.userId).populate("mails").then((users)=>{
      var filteredEvents = users.mails.filter(function(mail){
        return mail.type == 'Monthly';
     });
     return  successHandler(res,filteredEvents,200,"Data retrieval successfully");
  }).catch((err)=>{
   err=new Error("data retrival failed");
   err.statusCode=400;
   throw err;
  })
   }
   catch(e){
     return  failureHandler(res,e.message,e.statusCode);
   }
}
exports.getYearlyMails=async(req,res)=>{
   let err;
   try{
   let user=await User.findById(req.params.userId);
   if(!user){
      err=new Error("User not found");
      err.statusCode=404;
      throw err;
   }
   User.findById(req.params.userId).populate("mails").then((users)=>{
      var filteredEvents = users.mails.filter(function(mail){
        return mail.type == 'Yearly';
     });
     return  successHandler(res,filteredEvents,200,"Data retrieval successfully");
  }).catch((err)=>{
   err=new Error("data retrival failed");
   err.statusCode=400;
   throw err;
  })
   }
   catch(e){
     return  failureHandler(res,e.message,e.statusCode);
   }
}


// 
//1. will check if the user exists or not
//2. missing fileds
// 3.send mails
// 4. add to mail 
// 5. add this mail to user


//let x=0;
// const setinterval=setInterval(()=>{
//    if(x>2){
//       clearInterval(setinterval);
//       console.log("clearing....");
//    }
//    console.log("helloo");
//    if(x===1){
//       console.log("database");
//    }
//    x++;
// },30000);

