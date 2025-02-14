import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';

function Dashboard() {
  const [count, setCount] = useState({
    studentCount: 0,
    courseCount: 0,
    facultyCount: 0,
  });

  useEffect(() => {
    getCount();
  }, []);

  const getCount = () => {
   
    axios.get('http://localhost:8082/courses/active')
      .then((result) => {
        setCount((prevCount) => ({
          ...prevCount,
          courseCount: result.data.data.length, 
        }));
      })
      .catch((error) => {
        console.error('Error fetching course count:', error);
      });

   
    axios.get('http://localhost:8082/facultys')
      .then((result) => {
        setCount((prevCount) => ({
          ...prevCount,
          facultyCount: result.data.length, 
        }));
      })
      .catch((error) => {
        console.error('Error fetching faculty count:', error);
      });

    
    axios.get('http://localhost:8082/students')
      .then((result) => {
        setCount((prevCount) => ({
          ...prevCount,
          studentCount: result.data.length, 
        }));
      })
      .catch((error) => {
        console.error('Error fetching student count:', error);
      });
  };

  return (
    <>
      <h2 className="text-center mb-4">Dashboard</h2>

      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="main">
            
              <div id="div1" className="dashboard-card">
                <h5>Students</h5>
                <p>{count.studentCount}</p>
              </div>

              <div id="div2" className="dashboard-card">
                <h5>Courses</h5>
                <p>{count.courseCount}</p>
              </div>

              <div id="div3" className="dashboard-card">
                <h5>Faculties</h5>
                <p>{count.facultyCount}</p>
              </div>

              <div id="div4" className="dashboard-card">
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
