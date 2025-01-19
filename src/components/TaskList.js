import React, { useState } from "react";

const TaskList = ({ tasks, onEdit, onDelete, onAddTask, onRefresh, onSearch }) => {
  const [dropdownTaskId, setDropdownTaskId] = useState(null); // Track which task's dropdown is open

  const handleDropdownClick = (taskId) => {
    setDropdownTaskId(dropdownTaskId === taskId ? null : taskId); // Toggle dropdown
  };

  // Handle Edit action
  const handleEdit = (task) => {
    onEdit(task); // Call the parent's onEdit function
    setDropdownTaskId(null); // Close the dropdown
  };

  // Handle Delete action
  const handleDelete = (taskId) => {
    onDelete(taskId); // Call the parent's onDelete function
    setDropdownTaskId(null); // Close the dropdown
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerContainer}>
        {/* Left Side: Tasks Icon, Text, and Record Count */}
        <div style={styles.leftHeaderSection}>
          <div style={styles.taskHeader}>
            <div style={styles.tasksIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#cc0000"
              >
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 17l-3-3 1.41-1.41L9 14.17l6.59-6.59L17 9l-8 8z" />
              </svg>
            </div>
            <div style={styles.taskText}>
              <div style={styles.tasksTitle}>Tasks</div>
              <div style={styles.allTasks}>All Tasks</div>
            </div>
          </div>
          <div style={styles.recordCountContainer}>
            <div style={styles.recordCount}>{tasks.length} records</div>
          </div>
        </div>

        {/* Right Side: Merged Buttons and Search Bar */}
        <div style={styles.rightHeaderSection}>
          {/* Merged Buttons */}
          <div style={styles.mergedButtonsContainer}>
            <button onClick={onAddTask} style={styles.mergedButton}>
              New Task
            </button>
            <div style={styles.buttonDivider}></div> {/* Dividing line */}
            <button onClick={onRefresh} style={styles.mergedButton}>
              Refresh
            </button>
          </div>
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value)}
                style={styles.searchInput}
              />
              <span style={styles.searchIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>
                <div style={styles.checkboxContainer}>
                  <div style={styles.smallBox}></div>
                  Assigned To
                </div>
              </th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Due Date</th>
              <th style={styles.tableHeader}>Priority</th>
              <th style={styles.tableHeader}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noTasks}>
                  No tasks found. Add a new task!
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <div style={styles.checkboxContainer}>
                      <div style={styles.smallBox}></div>
                      <span style={styles.assignedToText}>{task.assignedTo}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{task.status}</td>
                  <td style={styles.tableCell}>{task.dueDate}</td>
                  <td style={styles.tableCell}>{task.priority}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.commentContainer}>
                      {task.comments}
                      <span
                        style={styles.triangle}
                        onClick={() => handleDropdownClick(task.id)}
                      >
                        ▼
                      </span>
                      {dropdownTaskId === task.id && (
                        <div style={styles.dropdown}>
                          <div
                            style={styles.dropdownItem}
                            onClick={() => handleEdit(task)} // Use handleEdit
                          >
                            Edit
                          </div>
                          <div
                            style={styles.dropdownItem}
                            onClick={() => handleDelete(task.id)} // Use handleDelete
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer - 5 Separate Rectangles */}
      <div style={styles.footerContainer}>
        {/* Left Side - Page Number and Triangles */}
        <div style={styles.pageNavigation}>
          <div style={styles.pageNumberBox}>20</div>
          <div style={styles.triangleContainer}>
            <div style={styles.triangleBox}>
              <div style={styles.upwardTriangle}></div>
            </div>
            <div style={styles.triangleBox}>
              <div style={styles.downwardTriangle}></div>
            </div>
          </div>
        </div>

        {/* Right Side - 5 Rectangles */}
        <div style={styles.footerRectangles}>
          <div style={styles.footerRectangle}>
            <span style={styles.arrow}>^</span>
            <span>First</span>
          </div>
          <div style={styles.footerRectangle}>
            <span style={styles.arrow}>&lt;</span>
            <span>Prev</span>
          </div>
          <div style={styles.footerRectangle}>
            <span>1</span> {/* Current Page Number */}
          </div>
          <div style={styles.footerRectangle}>
            <span style={styles.arrow}>&gt;</span>
            <span>Next</span>
          </div>
          <div style={{ ...styles.footerRectangle, borderRight: "1px solid #ddd" }}> {/* Add border-right here */}
            <span style={styles.arrow}>v</span>
            <span>Last</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  headerContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "10px",
    backgroundColor: "#f7f7f7", // Light grey background for header
    padding: "10px",
    borderRadius: "8px 8px 0 0", // Rounded corners at the top
  },
  leftHeaderSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  taskHeader: {
    display: "flex",
    alignItems: "center",
  },
  tasksIcon: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  taskText: {
    display: "flex",
    flexDirection: "column",
  },
  tasksTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  allTasks: {
    fontSize: "0.9rem",
    color: "#666",
  },
  recordCountContainer: {
    marginTop: "10px", // Add spacing between the red box and record count
  },
  recordCount: {
    fontSize: "0.9rem",
    color: "#666",
  },
  rightHeaderSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  mergedButtonsContainer: {
    display: "flex",
    border: "1px solid #ddd", // Light border around the merged buttons
    borderRadius: "4px", // Rounded corners for the container
    overflow: "hidden", // Ensure the border-radius applies to child elements
    marginBottom: "7px", // Smaller gap between buttons and search bar
  },
  mergedButton: {
    backgroundColor: "#FFE5CC", // Very slight dark orange background
    color: "#000", // Black font color
    padding: "8px 12px",
    border: "1px solid #ddd", // Lighter border for buttons
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease, transform 0.1s ease",
    width: "100px",
    ":active": {
      backgroundColor: "#FFD699", // Slightly darker on click
      transform: "scale(0.95)",
    },
  },
  buttonDivider: {
    width: "1px",
    backgroundColor: "#ddd", // Light grey divider
  },
  searchContainer: {
    marginBottom: "0", // Remove bottom margin to align with buttons
  },
  searchBox: {
    position: "relative",
  },
  searchInput: {
    width: "220px",
    padding: "8px 30px 8px 12px",
    border: "1px solid #ddd", // Lighter border for search bar
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#666",
  },
  tableWrapper: {
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#fff", // Changed to white background
  },
  tableRow: {
    transition: "background-color 0.3s ease",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "12px",
    color: "#333",
  },
  noTasks: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.2rem",
    padding: "20px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px", // Add space between the square box and the Assigned To values
  },
  smallBox: {
    width: "16px",
    height: "16px",
    backgroundColor: "#fff",
    border: "2px solid #ccc",
    borderRadius: "4px",
  },
  assignedToText: {
    color: "blue", // Blue font color for Assigned To values
  },
  commentContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "relative",
  },
  triangle: {
    cursor: "pointer",
    fontSize: "0.8rem",
    color: "#666",
    borderRadius: "4px",
    padding: "4px 6px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#FFE5CC", // Match the background color of New Task and Refresh buttons
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#FFD699", // Slightly darker on hover
    },
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    width: "100%", // Full width
    backgroundColor: "#f7f7f7", // Light grey background for footer
    padding: "10px",
    borderRadius: "0 0 8px 8px", // Rounded corners at the bottom
  },
  pageNavigation: {
    display: "flex",
    alignItems: "center",
    gap: "0", // No gap between rectangles
  },
  pageNumberBox: {
    padding: "8px 16px", // Wider padding for a horizontal rectangle
    border: "1px solid #ddd",
    borderRadius: "4px 0 0 4px", // Rounded corners on the left side
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#fff", // White background for the page number box
  },
  triangleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0", // No gap between triangles
  },
  triangleBox: {
    padding: "4px 10px", // Reduced padding to decrease height
    border: "1px solid #ddd",
    backgroundColor: "#fff", // White background for the triangle boxes
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto", // Let the content determine the height
  },
  upwardTriangle: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "10px solid #ccc", // Fainter color
    borderRadius: "2px", // Rounded edges
  },
  downwardTriangle: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: "10px solid #ccc", // Fainter color
    borderRadius: "2px", // Rounded edges
  },
  footerRectangles: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%", // Set width to half of the table
  },
  footerRectangle: {
    flex: 1,
    textAlign: "center",
    padding: "6px 8px", // Reduced padding to decrease height
    border: "1px solid #ddd", // Same border as the search bar
    borderRight: "none", // Remove right border for all rectangles
    backgroundColor: "#fff", // White background for the footer rectangles
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px", // Add a small gap between arrow and text
  },
  arrow: {
    fontSize: "0.9rem",
  },
};

export default TaskList;