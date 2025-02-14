import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Student() {

  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllStudentsActive();
  }, []);

  const getAllStudentsActive = () => {
    axios.get("http://localhost:8082/students").then((result) => {
      setStudents(result.data);
    });
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const formatGender = (gender) => {
    return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other';
  };

  const deleteStudent = (id) =>{
    axios.delete(`http://localhost:8082/student/${id}`).then((result)=>{
         if(result.data.status == 'success')
           alert("Student Deleted...")
    })
    .catch((error)=>{
       alert("Something Went Wrong...");
    })
 }

 const viewStudent = (id) =>{
  debugger;
     navigate(`/student/${id}`)
 }

  const addStudent = () =>{
    navigate("/addStudent");
  }

  return (
    <>
      <div className="container mt-5">
      <input 
          type="button" 
          value="Add" 
          onClick={addStudent} 
          id="add"
          className="fas fa-plus btn btn-primary"
        />
        <div className="row">
          <h2 className="text-center mb-4">Students List</h2>
          <div className="col-md-12 mx-auto">
            {/* Wrap the table inside a div with class 'table-responsive' */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-nowrap text-center">
                <thead>
                  <tr>
                    <th scope="col">Student ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Course</th>
                    <th scope="col">Address</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Gender</th>
                    {/* <th scope="col">Image</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item) => {
                    return (
                      <tr key={item.stdId}>
                        <td>{item.stdId}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.course.courseName}</td>
                        <td>{item.address}</td>
                        <td>{formatDate(item.birthDate)}</td>
                        <td>{formatGender(item.gender)}</td>
                        {/* <td>
                        <img 
                            src={`http://localhost:8082/images/${item.photoImageName}`} 
                            alt="Faculty" 
                            width="50" 
                            height="50" 
                           />
                        </td> */}
                        <td>
                          <button className="btn btn2 btn-danger" onClick={() => {deleteStudent(item.stdId)}}>Delete</button>
                      
                          <button className="btn btn2 btn-primary" onClick={() => {viewStudent(item.stdId)}}>View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
