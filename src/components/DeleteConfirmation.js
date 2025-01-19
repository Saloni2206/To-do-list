import React from "react";

const DeleteConfirmation = ({ taskName, onConfirm, onCancel }) => {
  return (
    <div style={styles.modalContainer}>
      {/* Delete Confirmation Window */}
      <div style={styles.container}>
        {/* Cross Button Outside the Delete Confirmation Window */}
        <button onClick={onCancel} style={styles.crossButton}>
          ×
        </button>

        <h3 style={styles.heading}>Delete</h3> {/* Centered heading */}
        <p style={styles.message}>
          Do you want to delete the task: <strong>{taskName}</strong>?
        </p>
        <div style={styles.buttonContainer}>
          <button
            onClick={onCancel}
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            style={{ ...styles.button, ...styles.confirmButton }}
          >
            Yes
          </button>
        </div>
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
  container: {
    position: "relative", // For positioning the cross button
    padding: "20px",
    backgroundColor: "#e0e0e0", // More greyish background color
    borderRadius: "0", // Sharp edges (no rounded corners)
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px", // Increased width to 800px
    width: "90%", // Ensure it doesn't exceed the viewport width
    textAlign: "left", // Align text to the left
    zIndex: 101, // Ensure it's above the overlay
  },
  heading: {
    fontSize: "1.5rem",
    color: "#fff", // White text color
    backgroundColor: "#cc0000", // Red background color
    padding: "10px", // Add padding for better spacing
    borderRadius: "0", // Sharp edges (no rounded corners)
    margin: "-20px -20px 20px -20px", // Align with the container edges
    textAlign: "center", // Center the heading text
  },
  message: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    textAlign: "left", // Align the message to the left
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end", // Align buttons to the right
    gap: "10px",
  },
  button: {
    padding: "8px 40px", // Increased width (horizontal padding) and decreased height (vertical padding)
    fontSize: "1rem",
    border: "2px solid #FFD700", // Yellow border for both buttons
    borderRadius: "0", // Sharp edges (no rounded corners)
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  cancelButton: {
    backgroundColor: "#006400", // Dark green background (matching Save button)
    color: "#FFD700", // Bright yellow font color (matching Save button)
  },
  confirmButton: {
    backgroundColor: "#FFD700", // Bright yellow background (matching Cancel button)
    color: "#006400", // Dark green font color (matching Cancel button)
  },
  crossButton: {
    position: "absolute", // Position the button absolutely
    top: "-40px", // Move it above the Delete Confirmation window
    right: "-1px", // Move it outside the Delete Confirmation window
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

export default DeleteConfirmation;