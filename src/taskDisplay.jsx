import React from "react";
import axios from "axios";

const taskDisplay= (props)=>{
  
  async function handleComplete(e) {
    console.log(e.target.value);
    try {
      await axios.put(`http://localhost:3002/completed/${props.Tid}`);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3002/delete/${props.Tid}`);
    } catch (err) {
      console.log(err);
    }
  }

return(
    <div>
      <div className="project-item" style={{backgroundColor: "brown"}}>
    <h2>{props.taskData}</h2>
    <button
        onClick={(e) => {
          handleComplete(e);
        }}
      >
        completed
      </button>
      <button onClick={handleDelete}>delete</button>
      </div>
    </div>
)
}
export default taskDisplay