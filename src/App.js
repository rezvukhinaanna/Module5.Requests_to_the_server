import "./App.css";
import { useEffect, useState } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { tasks } from "./firebase";

function App() {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    const tasksDbRef = ref(tasks, "tasks");
    return onValue(tasksDbRef, (snapshot) => {
      const loadedTasks = snapshot.val() || [];
      setTask(loadedTasks);
      setIsLoading(false);
    });
  }, []);

  const addNewTask = () => {
    const pushedTask = ref(tasks, "tasks");
    push(pushedTask, {
      title: "new task with firebase1",
      completed: false,
    }).then((response) => console.log(response));
  };

  const updateTask = () => {
    const updatedTask = ref(tasks, "tasks/f848");
    set(updatedTask, {
      title: "Покушать",
      completed: false,
    }).then((response) => console.log(response));
  };

  const deleteTask = () => {
    const deletedTask = ref(tasks, "tasks/d466");
    remove(deletedTask).then((response) => console.log(response));
  };

  const [searchWord, setsearchWord] = useState("");
  const [filterWord, setFilterWord] = useState([]);
  const [isItFiltered, setIsItFiltered] = useState(false);
  
  const onCheckWord = ({ target }) => {
    const value = target.value.toLowerCase();
    setsearchWord(value);

    console.log(Object.entries(task));
    const filtered = Object.entries(task).filter(([id, task]) =>
      task.title.toLowerCase().includes(value)
    );
    console.log(filtered);
    setFilterWord(filtered);
    setIsItFiltered(true);
    setIsItSorted(false);
  };

  const [sort, setSort] = useState([]);
  const [isItSorted, setIsItSorted] = useState(false);
  const sortFunction = () => {
    const sortedList = Object.entries(task).sort(([idA, taskA], [idB, taskB]) =>
      taskA.title.localeCompare(taskB.title)
    );
    setSort(sortedList);
    setIsItSorted(true);
    setIsItFiltered(false);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Начните вводить дело"
        className="search"
        value={searchWord}
        onChange={onCheckWord}
      ></input>
      <button className="filter-althabit-button" onClick={sortFunction}>
        Фильтрация по алфавиту
      </button>
      <button
        className="filter-althabit-button"
        onClick={() => {
          setIsItFiltered(false);
          setIsItSorted(false);
        }}
      >
        Сбросить фильтры
      </button>
      <div className="title">Мой список дел:</div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        (isItSorted
          ? sort
          : isItFiltered
          ? filterWord
          : Object.entries(task)
        ).map(([id, { title }]) => (
          <div key={id} className="task">
            {id}. {title}
          </div>
        ))
      )}

      <div className="buttonTasks">
        <button onClick={addNewTask}>Добавить новое дело</button>
        <button onClick={updateTask}>Обновить созданное дело</button>
        <button onClick={deleteTask}>Удалить созданное дело</button>
      </div>
    </div>
  );
}

export default App;
