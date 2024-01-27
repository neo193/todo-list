
import React, { useEffect, useState } from 'react';
import Modal from "../src/utils/modal.jsx";
import axios from 'axios';
import TaskDisplay from './taskDisplay.jsx';
import './style.css';
import CountdownTimer from './timer.jsx';

function Home() {
  const [uname, setUname] = useState("");
  const [taskname, setTaskname] = useState([]);

  useEffect(() => {
    async function usernameDisplay() {
      try {
        const response = await axios.get("http://localhost:3002/getUname");
        setUname(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }
    
    usernameDisplay();
  }, []);

  useEffect(() => {
    async function taskDisplay() {
      try {
        const response = await axios.get("http://localhost:3002/all");
        const tasksWithIds = response.data.map(task => ({
          taskName: task.taskName,
          taskId: task._id
        }));
        setTaskname(tasksWithIds);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    taskDisplay();
  },);

  return (
    <body className="container">
    <div className="container">
      <div className="left-panel">
        <div className="greeting">
          <h2> Hello {uname}</h2>
          <Modal /> 
          <p>Welcome back , we missed you!</p>
        </div>
        <div className="projects">
          <h3>ACTIVE TASKS</h3><hr></hr>
          <div className="project-item" style={{backgroundColor: "#7FFF00"}}>
            <h2>PUBG</h2>
            <CountdownTimer> </CountdownTimer> 
          </div>
          <div className="project-item" style={{backgroundColor: "#800080"}}>
            <h2>VALORANT</h2>
            <CountdownTimer> </CountdownTimer> 
          </div>
          <div className="project-item" style={{backgroundColor: "#FFC0CB"}}>
            <h2>COD</h2>
            <CountdownTimer> </CountdownTimer> 
          </div>
        </div>
      </div>  
    </div><div className="right-panel">
        <h3>TASK TO-DO :</h3><hr></hr>
        <div className="task-list">
          {taskname.map((data, index) => (
            <li key={index}>
              <TaskDisplay taskData={data.taskName} Tid={data.taskId} />
            </li>
          ))}
        </div>
      </div>
    </body>
  );
}

export default Home;
