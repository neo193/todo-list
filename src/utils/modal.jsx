import React from "react";
import { useState } from "react";

import "../utils/modal_des.css";
import axios from "axios";
import Task from "./task";
import Login from "./login";

const Modal = () => {
  const [Display, setDisplay] = useState(true);
  const [value, setValue] = useState("");
  const [MyArray, setMyArray] = useState([]);
  const [uid, setUid] = useState("");


  async function handleDisplay() {
    try {
      const user_id = await axios.get("http://localhost:3002/getUid");
      setUid(user_id.data);
    } catch (err) {
      console.log(err);
    }
    setDisplay(false);
  }

  async function handleSubmit(e) {
    setDisplay(true);
    e.preventDefault();

    

    const data = {
      userId: uid,
      taskName: value,
      taskDate: Date.now(),
      completed: "false",
    };

    try {
      const response=await axios.post("http://localhost:3002/new", { data });
     if(response.status==201){

       setMyArray([...MyArray, { id: uid, taskName: value,tId:response.data.task._id}]);

     }
     else{
      console.log(error)
     }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button onClick={handleDisplay}>New</button>
      <div className={Display ? "modal-hide" : "modal-style"}>
        <form action="" method="post">
          <input
            id="input-val"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Enter your new task"
          />
          <button onClick={handleSubmit}>Done</button>
        </form>
      </div>
      {MyArray.map((item, index) => (
        <Task key={index} id={item.id} value={item.taskName} TaskId={item.tId}/>
      ))}
      <Login />
    </div>
  );
};

export default Modal;
