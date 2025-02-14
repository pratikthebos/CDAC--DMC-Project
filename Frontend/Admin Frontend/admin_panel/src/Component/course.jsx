import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './courses.css';
import { useNavigate } from 'react-router-dom';

function Course() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:8082/courses/active")
      .then((result) => {
        setCourses(result.data.data); 
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  const addCourse = () => {
    navigate(`/addcourse`);
  };


  const deleteCourse = (id) =>{
     axios.delete(`http://localhost:8082/course/${id}`).then((result)=>{
          if(result.data.status == 'success')
            alert("Course Deleted...")
     })
     .catch((error)=>{
        alert("Something Went Wrong...");
     })
  }


  return (
    <>
      <div className="container mt-5">
        <input 
          type="button" 
          value="Add" 
          onClick={addCourse} 
          id="add"
          className="fas fa-plus btn btn-primary"
        />
        <div className="row">
          <h2 className="text-center mb-4">Course List</h2>
          <div className="col-md-12 mx-auto">
            {/* Make the table scrollable horizontally */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-nowrap">
                <thead className="text-center">
                  <tr>
                    <th scope="col">Course ID</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Course Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((item) => {
                    return (
                      <tr key={item.courseId}>
                        <td>{item.courseId}</td>
                        <td>{item.courseName}</td>
                        <td>{item.courseDesc}</td>
                        <td>{item.status}</td>
                        <td className="text-center">
                          <button className="btn btn-danger" onClick={() => {deleteCourse(item.courseId)}}>Delete</button>
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

export default Course;
