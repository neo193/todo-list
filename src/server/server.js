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

app.get('/all',async(req,res)=>{
   try{const data= await tasks.find({userId:user_id})
   res.json(data)}
    catch(err){
        console.log(err)
    }
})
let user_id;
let userName;
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
                userName=uname
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
app.get('/getUname',(req,res)=>{
    res.send(userName)
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

app.put('/completed/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await tasks.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.completed = !task.completed;

        await task.save();

        console.log('Task completion toggled:', task);
        res.status(200).json({ message: 'Task completion toggled successfully', task });
    } catch (error) {
        console.error('Error toggling task completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const result = await tasks.deleteOne({ _id: taskId });

        if (result.deletedCount === 1) {
            console.log('Task deleted successfully:', taskId);
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            console.log('Task not found for deletion:', taskId);
            res.status(404).json({ error: 'Task not found for deletion' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3002, () => {
    console.log("server connected")
})