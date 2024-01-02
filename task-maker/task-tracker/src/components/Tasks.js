import Task from "./Task"

const Tasks = ( {tasks, onDelete, onToggle} ) => {  
  return (
    <>
      {tasks.map((task) => ( //looping through the tasks 
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
