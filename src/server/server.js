const express = require("express")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;
const tasks = require("../server/mongo")
const users = require("../server/loginSchema")
const bodyparser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb+srv://todolistdbu1:todolist1234@todo-list-db.rn1dqor.mongodb.net/test?retryWrites=true&w=majority").then(() => {
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
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body.userData;

        // Create a new user document
        const newUser = new users({ username, password });

        // Save the user to the database
        await newUser.save();

        console.log('User registered:', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body.userData;
        const uname = username;

        let user = await users.findOne({ username: uname });

        if (user) {
            console.log("User is present");
            if (user.password === password) {
                user_id = user._id.toString();
                console.log('User ID: ', user_id);
                res.status(200).json({ message: 'Login successful', user_id });
            }
            else {
                console.log("Username or Password Incorrect.");
                res.status(404).json({ error: 'Username or Password Incorrect.' });
            }
        } else {
            console.log("User not found. Please register.");
            res.status(404).json({ error: 'User not found. Please register.' });
           
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/getUid', (req, res) => {
    res.send(user_id)
})
app.post('/new', async (req, res) => {
    try {
        const { userId, taskName, taskDate, completed } = req.body.data;

        const newTask = new tasks({
            userId: new ObjectId(userId),
            taskName,
            taskDate: new Date(Number(taskDate)),
            completed: completed.toLowerCase() === 'true',
        });

        await newTask.save();

        console.log('Task created:', newTask);
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/completed/:id', (req, res) => {
    var id = req.params
    var val = req.body
    console.log(id, val)
})

app.delete('/delete/:id', (req, res) => {
    var id = req.params
    console.log(id)
})


app.listen(3002, () => {
    console.log("server connected")
})