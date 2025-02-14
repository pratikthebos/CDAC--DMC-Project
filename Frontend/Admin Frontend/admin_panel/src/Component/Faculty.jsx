import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Faculty() {

  const [facultys, setFacultys] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllFaculty();
  }, []);

  const getAllFaculty = () => {
    axios.get("http://localhost:8082/facultys").then((result) => {
      setFacultys(result.data);
    });
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const formatGender = (gender) => {
    return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other';
  };

  const addFaculty = () =>{
      navigate("/addfaculty");
  }

  const viewFaculty = (id) =>{
     navigate(`/faculty/${id}`)
  }


  const deleteFaculty = (id) =>{
    axios.delete(`http://localhost:8082/faculty/${id}`).then((result)=>{
         if(result.data === 'Course status updated to inactive successfully.')
           alert("Faculty Deleted...")
    })
    .catch((error)=>{
       alert("Something Went Wrong..."+ error);
    })
 }


  return (
    <>
      <div className="container mt-5">

      <input 
          type="button" 
          value="Add" 
          onClick={addFaculty} 
          id="add"
          className="fas fa-plus btn btn-primary"
        />
        <div className="row">
          <h2 className="text-center mb-4">Faculty List</h2>
          <div className="col-md-12 mx-auto">
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-nowrap text-center">
                <thead>
                  <tr>
                    <th scope="col">Faculty ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Courses</th> */}
                    <th scope="col">Address</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Gender</th>
                    {/* <th scope="col">Image</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {facultys.map((item) => {
                    return (
                      <tr key={item.facultyId}>
                        <td>{item.facultyId}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        {/* <td>{item.courses.courseName}</td> */}
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
                          <button className="btn btn2 btn-danger text-center" onClick={() => {deleteFaculty(item.facultyId)}}>Delete</button>

                          <button className="btn btn2 btn-primary" onClick={() => {viewFaculty(item.facultyId)}}>View</button>
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

export default Faculty;
