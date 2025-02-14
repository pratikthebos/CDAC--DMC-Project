import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    birthDate: '',
    role: {roleId: ''},
    course : {courseId: ''}
     
  });

  const [courses, setCourses] = useState([]); // Stores courses from API
  const navigate = useNavigate();

  // Fetch courses from DB when component loads
  useEffect(() => {
    axios.get("http://localhost:8082/courses/active")
      .then((response) => {
        setCourses(response.data.data); // Assuming the response format contains `data`
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setStudent((prev) => ({
      ...prev,
      [name]: value,
      // Handle nested objects for role and courses
      role: name === "roleId" ? { roleId: value } : prev.role,
      course: name === "courseId" ? { courseId: value } : prev.course,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log('====================================');
      console.log(student);
      console.log('====================================');
      const response = await axios.post('http://localhost:8082/student', student);
      
      if (response.data != null) {
        navigate("/students");
      } else {
        alert('Failed to add Student. Please try again.');
      }
      
    } catch (error) {
      console.error('Error adding Student:', error);
      alert('An error occurred while adding Student.');
    }
  };

  return (
    <>
      <h2 className="text-center my-4">Add New Student</h2>
      <section className="container col-md-8">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
          {/* Faculty Information */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" value={student.firstName} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" value={student.lastName} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={student.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={student.password} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" value={student.gender} onChange={handleChange} className="form-control" required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" value={student.address} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input type="date" name="birthDate" value={student.birthDate} onChange={handleChange} className="form-control" required />
          </div>

          {/* Role Selection */}
<div className="mb-3">
  <label className="form-label">Role</label>
  <select name="roleId" value={student.role.roleId} onChange={handleChange} className="form-control" required>
    <option value="">Select Role</option>
    <option value="2">Student</option>
  </select>
</div>

{/* Course Selection */}
<div className="mb-3">
  <label className="form-label">Course</label>
  <select name="courseId" value={student.course.courseId} onChange={handleChange} className="form-control" required>
    <option value="">Select Course</option>
    {courses.map((course) => (
      <option key={course.courseId} value={course.courseId}>
        {course.courseName}
      </option>
    ))}
  </select>
</div>


          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Add Student</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddStudent;
