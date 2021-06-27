const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    salt:String,
    hash:String,
    googleId:String,
    token:String,
    mails:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Mail"
        }
    ]
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);