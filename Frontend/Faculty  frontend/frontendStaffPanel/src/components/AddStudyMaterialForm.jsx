import React, { useState } from "react";
import axios from "axios";
import "./AddStudyMaterialForm.css";

const AddStudyMaterialForm = ({ facultyId, onMaterialAdded, onClose }) => {
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !courseId || !subjectId) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);
    formData.append("subjectId", subjectId);
    formData.append("facultyId", facultyId);

    try {
      const response = await axios.post("http://localhost:5000/api/study-material/upload", formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onMaterialAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Error uploading study material:", error);
      setError("Failed to upload material. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Study Material</h3>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Course ID:</label>
          <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} required />

          <label>Subject ID:</label>
          <input type="text" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required />

          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} required />

          <div className="button-group">
            <button type="submit">Upload</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudyMaterialForm;
