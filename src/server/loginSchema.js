const mongoose = require("mongoose")
const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

   
const users= mongoose.model('users',loginSchema)
module.exports=users;