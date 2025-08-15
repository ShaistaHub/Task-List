import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"

function AddList ({addTask, setAddTask,}) {
    const [update, setUpdate] = useState(null)

    const inputRef = useRef("")
    // console.log(addTask)
    console.log(update)
        
async function addMyTask () {

  const taskText = inputRef.current.value.trim();
  if (!taskText) return; // ✅ Don't allow empty
  console.log(taskText)
  const inputValue = { Task: taskText };
  setAddTask((prev)=>[...prev, inputValue])

            const addData = await fetch("http://localhost:3000/addTask",{
            method: "POST",
            headers: {
            "Content-Type": "application/json", // ✅ important
          },
            body: JSON.stringify({ inputValue })
        })
        const data = await addData.json();
        console.log("Response from server:", data);
          inputRef.current.value = ""

}

function updateItem (task) {
    // let updateTask = addTask.find(tasks => tasks.Task === task)
    inputRef.current.value = task.Task
    setUpdate(task)
    console.log("task",task)
    console.log("update", update)
    console.log(inputRef.current.value)
  //   if (!updateTask) {
  // console.error("No match found for:", task);
  // return;
// }

}

 const handleSave = async () => {
  let inputValue = inputRef.current.value.trim();
  console.log(inputValue)
  console.log(update)
  try {
      const res = await fetch(`http://localhost:3000/tasks/${update._id}`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Task: inputValue}),
    });
    console.log(res)
        const data = await res.json();
        console.log("Response from server:", data);   
         if (!res.ok) {
      throw new Error("Failed to update");
    }
    console.log(res)

    console.log("Updated successfully");
    setAddTask(prev => prev.map(task => update._id === task._id ? update : task))

  setUpdate(null); // clear the update mode
  } catch (err) {
    console.error(err);
  }
};   

function deleteMyTask (task) {
 let filterTask = addTask.filter(deleteTask => deleteTask.Task !== task)
 console.log(filterTask)
 setAddTask(filterTask)
 deleteData();
}

 const deleteData = async () => {
    let fetchTask = await fetch(`http://localhost:3000/deletData`,  {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTask.Task)
      },)
}




    return (
        <>
        <div className="task-container">
            <input className="task-input" type="text"  ref={inputRef}  value={update?.Task || ""} onChange={(e) => setUpdate({ ...update, Task: e.target.value })}
             />
            <button className="task-button" onClick={update && update._id ? handleSave : addMyTask}>  {update && update._id ? "Update" : "Add"}</button>
<div className="task-list">
  {
    addTask.map((task) => {
      return (
        <div key={task._id} className="task-item">{task.Task}
        <div className="task-icons">
                <img width="16" height="16" 
                src="https://img.icons8.com/tiny-color/16/connection-sync.png"  onClick={()=> updateItem(task)}
                alt="connection-sync"    className="icon"/>
                <img width="16" height="16" 
                src="https://img.icons8.com/pulsar-gradient/48/delete-trash.png" onClick={()=> deleteMyTask(task.Task)}
                alt="delete-trash"    className="icon" />
                </div>
                </div>
                
              )
            }
          )
}
          </div>
        </div>     
        </>
    )
}

export default AddList;