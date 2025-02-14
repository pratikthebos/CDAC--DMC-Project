import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./StudyMaterialsPage.css";
import AddStudyMaterialForm from "./AddStudyMaterialForm";

const StudyMaterialsPage = () => {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      return;
    }



    try {
      const decodedToken = jwtDecode(token);
      setFacultyId(decodedToken.facultyId); // Extract facultyId from token

      axios
        .get("http://localhost:5000/api/study-material/study-material", {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          setStudyMaterials(response.data);
        })
        .catch((error) => {
          console.error("Error fetching study materials:", error);
          setError("Failed to load study materials. Please try again.");
        });

    } catch (error) {
      console.error("Token decoding error:", error);
      setError("Invalid token, please log in again.");
    }


    console.log("Current showForm state:", showForm);

  }, [showForm]);

  const handleMaterialAdded = (newMaterial) => {
    setStudyMaterials([...studyMaterials, newMaterial]);
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="study-materials-container">
      <h2>Uploaded Study Materials</h2>
      <button className="add-material-btn" onClick={() => setShowForm(true)}>Add Study Material</button>

      {/* <button
        className="add-material-btn"
        onClick={() => {
          console.log("Add Material Button Clicked!");
          setShowForm(true);
        }}
      > 
        Add Study Material
      </button> */}

      {/* {showForm && <AddStudyMaterialForm facultyId={facultyId} onMaterialAdded={handleMaterialAdded} onClose={() => setShowForm(false)} />} */}


      {showForm ? (
        <>
          <p>Form is Open</p>
          <AddStudyMaterialForm
            facultyId={facultyId}
            onMaterialAdded={handleMaterialAdded}
            onClose={() => {
              console.log("Closing Form");
              setShowForm(false);
            }}
          />
        </>
      ) : (
        <p>Form is Closed</p>
      )}
      <table className="study-materials-table">
        <thead>
          <tr>
          
            <th>File Name</th>
            <th>Course </th>
            <th>Subject </th>
            <th>Faculty </th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {studyMaterials.length > 0 ? (
            studyMaterials.map((material) => (
              <tr key={material.id}>
                <td>{material.fimeName}</td>
                <td>{material.courseId}</td>
                <td>{material.subjectId}</td>
                <td>{material.facultyId}</td>
                <td>
                  <a
                    href={`http://localhost:5000/uploads/${material.fimeName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No study materials available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudyMaterialsPage;
