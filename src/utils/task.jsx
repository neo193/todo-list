import React from "react";
import axios from "axios";

const Task = (props) => {
  // async function all(){
  //     try{
  //        const response= await axios.get("http://localhost:3002/all")
  //     //    console.log(response)
  //         }
  //         catch(err){
  //             console.log(err)
  //         }
  // }
  // all()
  async function handleComplete(e) {
    console.log(e.target.value);
    try {
      await axios.put(`http://localhost:3002/completed/${props.TaskId}`);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3002/delete/${props.TaskId}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="task-div">
      <h1>{props.value}</h1>
      <button
        onClick={(e) => {
          handleComplete(e);
        }}
      >
        completed
      </button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};
export default Task;
