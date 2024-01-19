const express= require("express")
const mongoose=require("mongoose")
const tasks=require("../server/mongo")
const users=require("../server/loginSchema")
const bodyparser=require("body-parser")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb+srv://todolistdbu1:todolist1234@todo-list-db.rn1dqor.mongodb.net/test?retryWrites=true&w=majority").then(()=>{
        console.log("database connected")
    })

// app.get('/all',async(req,res)=>{
//    try{const data= await tasks.find()
//    console.log(data)
//    res.send(data)} 
   
//     catch(err){
//         console.log(err)
//     }
// })
let user_id;
app.post('/register',(req,res)=>{
    const data= JSON.stringify(req.body)
    console.log(data)
    console.log(user_id)
})

app.post('/login',async (req,res)=>{
    
    const {userData}=req.body
    const {username,password}=userData
  const uname=username
    let user= await users.findOne({username:uname})
    if(user){
        console.log("user is present")
    }
    else{
        console.log("please register")
    }
     user_id=user._id.toString()
})
app.get('/getUid',(req,res)=>{
   res.send(user_id)
})
app.post('/new', (req, res) => {
    const data=JSON.stringify(req.body)
    console.log(data)

});

app.put('/completed/:id',(req,res)=>{
    var id=req.params
    var val=req.body
    console.log(id,val)
})

app.delete('/delete/:id',(req,res)=>{
    var id=req.params
    console.log(id) 
})


app.listen(3002,()=>{
    console.log("server connected")
})