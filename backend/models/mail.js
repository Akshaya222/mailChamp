const mongoose = require('mongoose');

const mailSchema = mongoose.Schema({
    type: String,
    to: String,
    cc: String,
    subject: String,
    body: String,
    message:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},
{
    timestamps:true
}) 
module.exports = mongoose.model("Mail", mailSchema);
