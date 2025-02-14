import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssignmentsPage.css";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      return;
    }

    axios
      .get("http://localhost:5000/api/assignments/assignments", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setError("Failed to load assignments. Please try again.");
      });
  }, []);

  // Handle grade input change
  const handleGradeChange = (stdAssignId, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [stdAssignId]: value,
    }));
  };

  // Handle grade submission
  const handleGradeSubmit = (stdAssignId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const grade = grades[stdAssignId];
    if (!grade || isNaN(grade) || grade < 0 || grade > 10) {
      alert("Please enter a valid grade (0-10).");
      return;
    }

    axios
      .post(
        `http://localhost:5000/api/assignments/gradeAssignment`,
        { stdAssignId, grade },
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        alert("Grade submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting grade:", error);
        alert("Failed to submit grade. Please try again.");
      });
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assignments-container">
      <h2>All Assignments</h2>
      <table className="assignments-table border-table">
        <thead>
          <tr>
            <th>Name</th>
            
            <th>Course </th>
            <th>Subject</th>
            <th>Publish Date</th>
            <th>Due Date</th>
            <th>Download / View</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment.stdAssignId}>
                <td>{assignment.stdAssignName}</td>
                <td>{assignment.courseId}</td>
                <td>{assignment.subjectId}</td>
                <td>{new Date(assignment.publishDate).toLocaleDateString()}</td>
                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td>
                  {assignment.fileName ? (
                    <a
                      href={`http://localhost:5000/uploads/${assignment.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download
                    </a>
                  ) : (
                    "No file"
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={grades[assignment.stdAssignId] || ""}
                    onChange={(e) =>
                      handleGradeChange(assignment.stdAssignId, e.target.value)
                    }
                    placeholder="Enter Grade"
                  />
                  <button
                    onClick={() => handleGradeSubmit(assignment.stdAssignId)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No assignments available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsPage;
