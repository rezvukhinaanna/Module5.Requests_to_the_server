import { useTasks } from "../../context/context";

const TaskItem = ({ id, title }) => {
  const { updateTask, deleteTask } = useTasks();

  return (
    <div key={id} className="task">
      {title}
      <button onClick={() => updateTask(id)}>Обновить</button>
      <button onClick={() => deleteTask(id)}>Удалить</button>
    </div>
  );
};

export default TaskItem;
