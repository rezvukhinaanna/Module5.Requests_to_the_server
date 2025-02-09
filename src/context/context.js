import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getTasks,
  addTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../api/api";

const TaskContext = createContext(null);
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [searchWord, setsearchWord] = useState("");
  const [filterWord, setFilterWord] = useState([]);
  const [isItFiltered, setIsItFiltered] = useState(false);
  const [sort, setSort] = useState([]);
  const [isItSorted, setIsItSorted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTasks()
      .then((json) => {
        setTasks(json);
        setFilterWord(json);
      })
      .finally(() => setIsLoading(false));
  }, [newTask]);

  const deleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const updateTask = async (id) => {
    try {
      await apiUpdateTask(id);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, title: "дело обновлено", completed: true }
            : task
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const refreshTasks = () => setNewTask(!newTask);

  const onCheckWord = ({ target }) => {
    const value = target.value.toLowerCase();
    setsearchWord(value);

    const filtered = tasks.filter((i) => i.title.toLowerCase().includes(value));
    setFilterWord(filtered);
    setIsItFiltered(true);
  };

  const sortFunction = () => {
    const sortedList = [...tasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSort(sortedList);
    setIsItSorted(true);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        refreshTasks,
        addTask,
        updateTask,
        deleteTask,
        searchWord,
        setsearchWord,
        filterWord,
        isItFiltered,
        onCheckWord,
        sort,
        isItSorted,
        sortFunction,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
