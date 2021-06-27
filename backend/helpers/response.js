exports.successHandler=(res,data,statusCode=200,message="Success")=>{
   res.status(statusCode).send({
        status:"success",
        message,
        data
    })
}

exports.failureHandler=(res,message,statusCode=400)=>{
    res.status(statusCode).send({
        status:"failure",
        message
    })
}