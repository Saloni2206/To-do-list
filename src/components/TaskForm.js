import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, selectedTask, onCancel }) => {
  const [task, setTask] = useState({
    assignedTo: "",
    status: "", // Completely blank by default
    dueDate: "",
    priority: "", // Completely blank by default
    comments: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({
      assignedTo: "",
      status: "", // Reset to blank
      dueDate: "",
      priority: "", // Reset to blank
      comments: "",
    });
  };

  return (
    <div style={styles.modalContainer}>
      {/* New Task Box */}
      <div style={styles.formContainer}>
        {/* Cross Button Outside the New Task Box */}
        <button onClick={onCancel} style={styles.crossButton}>
          ×
        </button>

        <h2 style={styles.header}>{selectedTask ? "Edit Task" : "New Task"}</h2>
        <hr style={styles.horizontalLine} />
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.horizontalLayout}>
            <div style={styles.leftSection}>
              <label style={styles.label}>
                <span style={styles.mandatoryStar}>*</span>Assigned To
                <input
                  type="text"
                  name="assignedTo"
                  value={task.assignedTo}
                  onChange={handleChange}
                  style={{ 
                    ...styles.input, 
                    backgroundColor: "#fff", // Ensure white background
                    color: "#333", // Ensure black text color
                  }}
                  required
                />
              </label>
              <label style={styles.label}>
                Due Date
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  style={{ 
                    ...styles.input, 
                    userSelect: "none", // Prevent text selection
                  }}
                  required
                  onClick={(e) => e.target.showPicker()} // Force calendar to open on click
                />
              </label>
            </div>

            <div style={styles.rightSection}>
              <label style={styles.label}>
                <span style={styles.mandatoryStar}>*</span>Status
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">{/* Completely blank option */}</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label style={styles.label}>
                <span style={styles.mandatoryStar}>*</span>Priority
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">{/* Completely blank option */}</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>
          </div>

          {/* Description Field - Full Width */}
          <div style={styles.fullWidthSection}>
            <label style={styles.label}>
              Description
              <textarea
                name="comments"
                value={task.comments}
                onChange={handleChange}
                style={styles.textarea}
                rows="3"
              />
            </label>
          </div>

          <div style={styles.buttonContainer}>
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalContainer: {
    position: "fixed", // Position the modal container fixed to the viewport
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 100, // Ensure it's above other content
  },
  formContainer: {
    width: "900px", // Decreased width to 900px
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    position: "relative", // For positioning the cross button
  },
  header: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "30px", // Increased margin to 30px
  },
  horizontalLine: {
    border: "0",
    height: "1px",
    background: "#ddd",
    marginBottom: "20px", // Adjust spacing below the line
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  horizontalLayout: {
    display: "flex",
    gap: "20px", // Space between left and right sections
  },
  leftSection: {
    flex: 1, // Take up half the space
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  rightSection: {
    flex: 1, // Take up half the space
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  fullWidthSection: {
    width: "100%", // Full width
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontWeight: "bold",
    color: "#555",
    position: "relative", // For positioning the red star
  },
  mandatoryStar: {
    position: "absolute", // Position the star absolutely
    top: "0", // Align to the top
    left: "-10px", // Move slightly to the left
    color: "red", // Red color for the star
    fontSize: "1rem", // Adjust size as needed
  },
  input: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    color: "#333", // Default text color for input fields
    backgroundColor: "#fff", // Ensure white background
  },
  select: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  },
  textarea: {
    width: "98.5%", // 98.5% width for the textarea
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    resize: "vertical",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
  saveButton: {
    backgroundColor: "#006400", // Dark green background
    color: "#FFD700", // Bright yellow font color
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    backgroundColor: "#FFD700", // Bright yellow background
    color: "#006400", // Dark green font color
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  crossButton: {
    position: "absolute", // Position the button absolutely
    top: "-35px", // Move it above the New Task window
    right: "-5px", // Move it outside the New Task window
    backgroundColor: "transparent", // Transparent background
    border: "none", // No border
    fontSize: "2rem", // Larger font size
    cursor: "pointer", // Pointer cursor on hover
    color: "#fff", // White color for the cross
    transition: "color 0.3s ease", // Smooth color transition
    zIndex: 102, // Ensure it's above the modal
    ":hover": {
      color: "#cc0000", // Red color on hover
    },
  },
};

export default TaskForm;