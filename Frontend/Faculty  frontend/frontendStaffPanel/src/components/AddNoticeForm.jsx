import React, { useState } from "react";
import axios from "axios";
import "./AddNoticeForm.css"; 

const AddNoticeForm = ({ onClose, onNoticeAdded }) => {
  const [noticeText, setNoticeText] = useState("");
  const [courseId, setCourseId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in again.");
      return;
    }

    const roleId = 2;

    const newNotice = { noticeText, courseId, facultyId , roleId };

    axios.post("http://localhost:5000/api/notices/notices", newNotice, {
      headers: { Authorization: `${token}` },
    })
    .then(() => {
      onNoticeAdded();
      onClose(); 
    })
    .catch(() => setError("Failed to add notice. Please try again."));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Notice</h3>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Notice Text:</label>
          <input type="text" value={noticeText} onChange={(e) => setNoticeText(e.target.value)} required />

          <label>Course ID:</label>
          <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} required />

          <label>Faculty ID:</label>
          <input type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} required />

          <div className="form-buttons">
            <button type="submit" className="save-btn">Add Notice</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoticeForm;
