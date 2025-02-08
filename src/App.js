import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3005/tasks")
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
        setFilterWord(json);
      })
      .finally(() => setIsLoading(false));
  }, [newTask]);

  const fetchTasks = () => {
    fetch("http://localhost:3005/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

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

  const updateTask = (id) => {
    fetch(`http://localhost:3005/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: "дело обновлено",
        completed: true,
      }),
    })
      .then((response) => response.json())
      .then((json) => setNewTask(!newTask));
  };

  const deleteTask = (id) => {
    console.log(id)
    fetch(`http://localhost:3005/tasks/${id}`, {
      method: "DELETE",
    }).then(() => fetchTasks());
  };

  const [searchWord, setsearchWord] = useState("");
  const [filterWord, setFilterWord] = useState([]);
  const [isItFiltered, setIsItFiltered] = useState(false);

  const onCheckWord = ({ target }) => {
    const value = target.value.toLowerCase();
    setsearchWord(value);

    const filtered = tasks.filter((i) => i.title.toLowerCase().includes(value));
    setFilterWord(filtered);
    setIsItFiltered(true);
  };

  const [sort, setSort] = useState([]);
  const [isItSorted, setIsItSorted] = useState(false);
  const sortFunction = () => {
    const sortedList = [...tasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
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
            {title}
            <button onClick={() => updateTask(id)}>Обновить созданное дело</button>
            <button onClick={deleteTask(id)}>Удалить созданное дело</button>
          </div>
        ))
      ) : isItFiltered ? (
        filterWord.map(({ id, title }) => (
          <div key={id} className="task">
            {title}
            <button onClick={() => updateTask(id)}>Обновить созданное дело</button>
            <button onClick={deleteTask(id)}>Удалить созданное дело</button>
          </div>
        ))
      ) : (
        tasks.map(({ id, title }) => (
          <div key={id} className="task">
            {title}
            <button onClick={() => updateTask(id)}>Обновить созданное дело</button>
            <button onClick={() => deleteTask(id)}>Удалить созданное дело</button>
          </div>
        ))
      )}

      <div className="buttonTasks">
        <button onClick={addNewTask}>Добавить новое дело</button>
      </div>
    </div>
  );
}

export default App;
