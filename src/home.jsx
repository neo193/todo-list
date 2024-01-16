import React from 'react';
import './style.css';

function Home() {
  return (
    <div className="container">
      <div className="left-panel">
        <div className="greeting">
          <h2>Hi Samantha</h2>
          <p>Welcome back to the workspace, we missed You!</p>
        </div>
        <div className="projects">
          <h3>Projects (3)</h3>
          <div className="project-item" style={{backgroundColor: "#7FFF00"}}>
            <p>Green House</p>
          </div>
          <div className="project-item" style={{backgroundColor: "#800080"}}>
            <p>Cyber Punk</p>
          </div>
          <div className="project-item" style={{backgroundColor: "#FFC0CB"}}>
            <p>Easy Crypto</p>
          </div>
          {/* Add more project items here */}
        </div>
      </div>
      <div className="right-panel">
        <h3>Cyber Punk</h3>
        <ul className="task-list">
          <li><input type="checkbox" /><span>Create initial layout for homepage</span></li>
          <li><input type="checkbox" /><span>Fixing logo with transparent background</span></li>
          <li><input type="checkbox" /><span>Creation initial style guide</span></li>
          {/* Add more task items here */}
        </ul>
      </div>
    </div>
  );
}

export default Home;
