import Task from "./Task"

const Tasks = ( {tasks, onDelete, onToggle} ) => {  
  return (
    <>
      {tasks.map((task, index) => ( //looping through the tasks 
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
