import React, { useState, useEffect } from "react";
import "./NoticesPage.css";
import axios from "axios";
import AddNoticeForm from "./AddNoticeForm"; // Import the new component

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      return;
    }

    axios
      .get("http://localhost:5000/api/notices/notices", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => setNotices(response.data))
      .catch(() => setError("Failed to load notices. Please try again."));
  };

  return (
    <div className="notices-container">
      <h2>All Notices</h2>
      {error && <div className="error-message">{error}</div>}
      
      <button className="add-notice-btn" onClick={() => setShowAddForm(true)}>+ Add Notice</button>

      <table className="notices-table">
        <thead>
          <tr>
            <th>Notice ID</th>
            <th>Notice Text</th>
            <th>Course ID</th>
            <th>Faculty ID</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice.noticeId}>
                <td>{notice.noticeId}</td>
                <td>{notice.noticeText}</td>
                <td>{notice.courseId}</td>
                <td>{notice.facultyId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No notices available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddForm && <AddNoticeForm onClose={() => setShowAddForm(false)} onNoticeAdded={fetchNotices} />}
    </div>
  );
};

export default NoticesPage;
