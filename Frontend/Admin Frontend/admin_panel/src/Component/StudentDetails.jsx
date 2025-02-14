import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const [student, setStudent] = useState({
    stdId: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthDate: "",
    address: "",
    photoImageName: "",
    status: "",
    role: { roleId: "", roleName: "" },  // Default structure to prevent undefined errors
    course: { courseId: "", courseName: "", courseDesc: "" }
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/students/${id}`)
      .then((result) => {
        setStudent(result.data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="row">
          {/* Profile Image */}
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8082/images/${student.photoImageName}`} 
              alt="Student Profile"
              className="img-fluid rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4 className="mt-3">{student.firstName} {student.lastName}</h4>
            <p className="text-muted">{student.role?.roleName || "N/A"}</p>
          </div>

          {/* Student Details */}
          <div className="col-md-8">
            <h4 className="mb-3">Student Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Student ID</th>
                  <td>{student.stdId || "N/A"}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{student.email || "N/A"}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{student.gender === "M" ? "Male" : student.gender === "F" ? "Female" : "Other"}</td>
                </tr>
                <tr>
                  <th>Birth Date</th>
                  <td>{student.birthDate || "N/A"}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{student.address || "N/A"}</td>
                </tr>
                <tr>
                  <th>Course</th>
                  <td>{student.course?.courseName || "N/A"}</td>
                </tr>
                <tr>
                  <th>Course Description</th>
                  <td>{student.course?.courseDesc || "N/A"}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className={`badge bg-${student.status === "Active" ? "success" : "danger"}`}>
                      {student.status || "N/A"}
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

export default StudentDetails;
