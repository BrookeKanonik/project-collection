import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import { useState } from 'react'


function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "eat food",
      day: "today",
      reminder: false,
    },
    {
      id: 2,
      text: "study",
      day: "January 5th 2024",
      reminder: true,
    }
  ])

  //Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = { id, ...task } //creating the new task
  setTasks([...tasks, newTask]) //adding old tasks and new one to display
}

  //Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id)) //do not show tasks with the id because we are deleting them
}

//Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder : !task.reminder} : task))
}


  return (
    <div className="container">
      <Header/>
      <AddTask onAdd ={addTask} />
      { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
    </div>
  );
}

// const App = () => {
//   return (
//     <div className="container">
//       <Header/>
//     </div>
//   )
// }


export default App;
