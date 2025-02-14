import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const FacultyDetails = () => {
  const [faculty, setFaculty] = useState({
    facultyId: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthDate: "",
    address: "",
    photoImageName: "",
    status: "",
    role: { roleId: "", roleName: "" },  // Default structure to prevent undefined errors
    courses: { courseId: "", courseName: "", courseDesc: "" }
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/faculty/${id}`)
      .then((result) => {
        setFaculty(result.data);
      })
      .catch((error) => {
        console.error("Error fetching faculty details:", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="row">
          {/* Profile Image */}
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8082/images/${faculty.photoImageName}`} 
              alt="faculty Profile"
              className="img-fluid rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4 className="mt-3">{faculty.firstName} {faculty.lastName}</h4>
            <p className="text-muted">{faculty.role?.roleName || "N/A"}</p>
          </div>

          {/* Student Details */}
          <div className="col-md-8">
            <h4 className="mb-3">Faculty Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Faculty ID</th>
                  <td>{faculty.facultyId || "N/A"}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{faculty.email || "N/A"}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{faculty.gender === "M" ? "Male" : faculty.gender === "F" ? "Female" : "Other"}</td>
                </tr>
                <tr>
                  <th>Birth Date</th>
                  <td>{faculty.birthDate || "N/A"}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{faculty.address || "N/A"}</td>
                </tr>
                <tr>
                  <th>Courses</th>
                  <td>{faculty.courses?.courseName || "N/A"}</td>
                </tr>
                <tr>
                  <th>Course Description</th>
                  <td>{faculty.courses?.courseDesc || "N/A"}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className={`badge bg-${faculty.status === "active" ? "success" : "danger"}`}>
                      {faculty.status || "N/A"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
