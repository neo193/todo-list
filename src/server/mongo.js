const mongoose = require("mongoose")
const tasksSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    taskName:{
        type:String,
        required:true,
    },
    taskDate:{
        type:Date,
        required:true,
    },
    completed:{
        type:String,
        required:true,
    },
})

   
const tasks= mongoose.model('tasks',tasksSchema)
module.exports=tasks;