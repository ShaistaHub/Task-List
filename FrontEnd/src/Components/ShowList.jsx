import { useEffect } from "react";
function ShowList ({addTask, setAddTask, }) {

//     useEffect(() => {
//     console.log("Updated state:", update);
//   }, [update]);

     async function getData() {
        let res = await fetch("http://localhost:3000/getdata");
        let data = await res.json()
        console.log(data)
        setAddTask(data)
     }


  

    return (
        <>
    <ul  className="task-ul">
      <button className="get-button" onClick={getData}>get</button>
      {/* <button onClick={updateItem}>update</button> */}
     
    </ul>
        </>
    )
}

export default ShowList;