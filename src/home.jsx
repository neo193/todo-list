// Home.jsx
import React, { useEffect, useState } from 'react';
import Modal from "../src/utils/modal.jsx";
import axios from 'axios';
import TaskDisplay from './taskDisplay.jsx';
import './style.css';

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

  

  return (
    <div className="container">
      <div className="left-panel">
        <div className="greeting">
          <h2> Hello {uname}</h2>
          <Modal /> 
          <p>Welcome back to the world, we missed you!</p>
        </div>
        <div className="projects">
          <h3>Projects (3)</h3>
          <div className="project-item" style={{backgroundColor: "#7FFF00"}}>
            <p>pubg</p>
          </div>
          <div className="project-item" style={{backgroundColor: "#800080"}}>
            <p>valorant</p>
          </div>
          <div className="project-item" style={{backgroundColor: "#FFC0CB"}}>
            <p>cod</p>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <h3>CALL OF DUTY</h3>
        <div className="task-list">
          {taskname.map((data, index) => (
            <li key={index}>
             
              <TaskDisplay taskData={data}/>
            </li>
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Home;
