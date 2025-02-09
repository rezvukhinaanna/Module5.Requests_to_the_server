import { useTasks } from "../../context/context";
import './task-controls.css'

export const TaskControls = () => {

    const {addTask, sortFunction, refreshTasks} = useTasks()
  return (
    <div className="button-controle">
      <div>
        <button className="buttonTasks" onClick={() => addTask().then(refreshTasks)}>Добавить новое дело</button>
      </div>
      <button className="filter-althabit-button" onClick={sortFunction}>
        Фильтрация по алфавиту
      </button>
    </div>
  );
};
