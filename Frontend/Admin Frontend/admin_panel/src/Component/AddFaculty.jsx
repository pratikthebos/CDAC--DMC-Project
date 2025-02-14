import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddFaculty() {
  const [faculty, setFaculty] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    birthDate: '',
    role: { roleId: '' },
    courses: { courseId: '' },
    image: null,  // New field for image
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
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFaculty((prev) => ({
        ...prev,
        image: e.target.files[0],  // Store file object
      }));
    } else {
      setFaculty((prev) => ({
        ...prev,
        [name]: value,
        role: name === "roleId" ? { roleId: value } : prev.role,
        courses: name === "courseId" ? { courseId: value } : prev.courses,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let imageName = "";
  
      // Step 1: Upload Image First (if image is selected)
      if (faculty.image) {
        const imageFormData = new FormData();
        imageFormData.append('file', faculty.image);
  
        const imageResponse = await axios.post('http://localhost:8082/upload/image', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        imageName = imageResponse.data; // Assuming API returns only the image name
      }
  
      // Step 2: Submit Faculty Details with Image Name
      const facultyData = {
        firstName: faculty.firstName,
        lastName: faculty.lastName,
        email: faculty.email,
        password: faculty.password,
        gender: faculty.gender,
        address: faculty.address,
        birthDate: faculty.birthDate,
        role: { roleId: faculty.role.roleId },
        courses: { courseId: faculty.courses.courseId },
        photoImageName: imageName, // Store only image name
      };
  
      const response = await axios.post('http://localhost:8082/faculty', facultyData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.data) {
        navigate("/facultys");
      } else {
        alert('Failed to add faculty. Please try again.');
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      alert('An error occurred while adding faculty.');
    }
  };
  

  return (
    <>
      <h2 className="text-center my-4">Add New Faculty</h2>
      <section className="container col-md-8">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light" encType="multipart/form-data">
          {/* Faculty Information */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" value={faculty.firstName} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" value={faculty.lastName} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={faculty.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={faculty.password} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" value={faculty.gender} onChange={handleChange} className="form-control" required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" value={faculty.address} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input type="date" name="birthDate" value={faculty.birthDate} onChange={handleChange} className="form-control" required />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="roleId" value={faculty.role.roleId} onChange={handleChange} className="form-control" required>
              <option value="">Select Role</option>
              <option value="1">Admin</option>
            </select>
          </div>

          {/* Course Selection */}
          <div className="mb-3">
            <label className="form-label">Course</label>
            <select name="courseId" value={faculty.courses.courseId} onChange={handleChange} className="form-control" required>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control" required />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Add Faculty</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddFaculty;
