const jwt=require('jsonwebtoken');
console.log(process.env.JWT_SECRET)
exports.issueJwt=(id)=>{
  try{
    let token= jwt.sign({
        id
       }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES_IN });
     return token;
  }
 catch(e){
    return e.message
  }
}

exports.verfiyJwt=(req)=>{
 let token=req.header.Authorization
   try{
    let payload=jwt.verify(
        token,
    process.env.JWT_SECRET)
    return payload;
   }
   catch(e){
        return e.message
   }
}

