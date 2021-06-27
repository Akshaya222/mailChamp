const mongoose=require('mongoose');
console.log(process.env.mongoDB_URL)

module.exports=mongoose.connect(process.env.mongoDB_URL,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true}).then((res)=>{
    console.log("done")
 }).catch((error)=>{
     console.log(error);
 });
 