let tasks = [];

export const getTasks = () => [...tasks]; // Return a copy of tasks

export const addTask = (task) => {
  task.id = tasks.length + 1; // Generate a unique ID
  tasks.push(task);
};

export const updateTask = (updatedTask) => {
  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
};

export const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id); // Remove the task with the given ID
  return tasks; // Return the updated tasks array
};