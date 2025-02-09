import { useTasks } from "../../context/context";
import TaskItem from "../task-item/task-item";

export const TaskList = () => {
  const { isLoading, isItSorted, sort, isItFiltered, filterWord, tasks } =
    useTasks();
  if (isLoading) return <div className="loader"></div>;

  const displaydTasks = isItSorted ? sort : isItFiltered ? filterWord : tasks;
  return (
    <>
      <div className="title">Мой список дел:</div>

      {displaydTasks.map(({ id, title }) => (
        <TaskItem key={id} id={id} title={title} />
      ))}
    </>
  );
};
