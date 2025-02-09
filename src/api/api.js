const API_URL = "http://localhost:3005/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTask = async () => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "my task", completed: false }),
  });
};

export const updateTask = async (id) => {
  console.log(id)
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "дело обновлено", completed: true }),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
