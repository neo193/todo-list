import React, { useState } from 'react';
import Modal from "../src/utils/modal.jsx"
import axios from 'axios';
import './style.css';

function Home() {
  const [uname,setUname]=useState("")
  async function usernameDisplay(){
   const response= await axios.get("http://localhost:3002/getUname")
   setUname(response.data)
  }
  usernameDisplay()
  return (
    <div className="container">
      <div className="left-panel">
        <div className="greeting">
          <h2> Hello {uname}</h2>
          <Modal/> 
          <p>Welcome back to the world, we  missed You!</p>
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
        <ul className="task-list">
          <li><input type="checkbox" /><span>Create initial layout for homepage</span></li>
          <li><input type="checkbox" /><span>Fixing logo with transparent background</span></li>
          <li><input type="checkbox" /><span>Creation initial style guide</span></li>
         
        </ul>
      </div>

    </div>
  );
}

export default Home;
