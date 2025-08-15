import { useState } from 'react'
import AddList from './Components/AddList'
import ShowList from './Components/ShowList'
import './App.css'

function App() {
  const [addTask, setAddTask] = useState([])
  // const [update, setUpdate] = useState([])

  return (
    <>
     <AddList addTask={addTask} setAddTask={setAddTask} />
     <ShowList addTask={addTask} setAddTask={setAddTask}  />
    </>
  )
}

export default App
