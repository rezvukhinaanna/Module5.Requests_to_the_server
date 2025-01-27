import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTask(json))
      .finally(() => setIsLoading(false));
  }, []);

  const [task1, setTask1] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3005/tasks")
      .then((response) => response.json())
      .then((json) => {
        setTask1(json);
        setFilterWord(json);
      })
      .finally(() => setIsLoading(false));
  }, [newTask]);

  const addNewTask = () => {
    fetch("http://localhost:3005/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: "my task",
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((json) => setNewTask(!newTask));
  };

  const updateTask = () => {
    fetch("http://localhost:3005/tasks/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: "дело поменяло статус",
        completed: true,
      }),
    })
      .then((response) => response.json())
      .then((json) => setNewTask(!newTask));
  };

  const deleteTask = () => {
    fetch("http://localhost:3005/tasks/5", {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: "дело поменяло статус",
        completed: true,
      }),
    })
      .then((response) => response.json())
      .then((json) => setNewTask(!newTask));
  };

  const [searchWord, setsearchWord] = useState("");
  const [filterWord, setFilterWord] = useState([]);

  const onCheckWord = ({ target }) => {
    const value = target.value.toLowerCase();
    setsearchWord(value);

    const filtered = task1.filter((i) => i.title.toLowerCase().includes(value));
    setFilterWord(filtered);
  };

  const [sort, setSort] = useState([]);
  const [isItSorted, setIsItSorted] = useState(false);
  const sortFunction = () => {
    const sortedList = [...task1].sort((a, b) => a.title.localeCompare(b.title));
    setSort(sortedList);
    setIsItSorted(true);
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
      <div className="title">Мой список дел:</div>
      {isLoading ? (
        <div className="loader"></div>
      ) : isItSorted ? (
        sort.map(({ id, title }) => (
          <div key={id} className="task">
            {id}. {title}
          </div>
        ))
      ) : (
        filterWord.map(({ id, title }) => (
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

      <div className="title">Список дел (placeholder):</div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        task.map(({ id, title }) => (
          <div key={id} className="task">
            {id}. {title}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
