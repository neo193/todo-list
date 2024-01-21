import React from "react";
import axios from "axios";

const taskDisplay= (props)=>{
  
  async function handleComplete(e) {
    console.log(e.target.value);
    try {
      await axios.put(`http://localhost:3002/completed/${props.TaskId}`);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete() {
    console.log('helllo',props.TaskId)
    try {
      await axios.delete(`http://localhost:3002/delete/${props.TaskId}`);
    } catch (err) {
      console.log(err);
    }
  }

return(
    <div>
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
)
}
export default taskDisplay