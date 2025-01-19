import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { getTasks, addTask, updateTask, deleteTask } from "./services/taskService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    setTasks(getTasks());
  }, []);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsFormVisible(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToDelete(task);
    setIsDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    const updatedTasks = deleteTask(taskToDelete.id);
    setTasks(updatedTasks);
    setIsDeleteConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationVisible(false);
    setTaskToDelete(null);
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setTasks(getTasks());
    setIsFormVisible(false);
  };

  const handleRefresh = () => {
    setTasks(getTasks()); // Refresh the task list
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>To-Do List</h1>
      </header>

      {/* Overlay for modal */}
      {isFormVisible && <div style={styles.overlay}></div>}
      {isDeleteConfirmationVisible && <div style={styles.overlay}></div>}

      {/* Task Form Modal */}
      {isFormVisible && (
        <div style={styles.modal}>
          <TaskForm
            onSave={handleSaveTask}
            selectedTask={selectedTask}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks} // Pass filtered tasks
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onAddTask={handleAddTask}
        onRefresh={handleRefresh}
        onSearch={handleSearch}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationVisible && (
        <DeleteConfirmation
          taskName={taskToDelete ? taskToDelete.assignedTo : ""}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  header: {
    backgroundColor: "#0c005a",
    padding: "10px 20px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "1.8rem",
    margin: 0,
    paddingLeft: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  },
  modal: {
    position: "fixed",
    top: "55%", // Move the modal slightly downwards (from 50% to 55%)
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 101,
    width: "900px", // Match the width of the TaskForm container
  },
};

export default App;