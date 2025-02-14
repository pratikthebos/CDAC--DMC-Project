import axios from 'axios';
import React, { useState } from 'react';

function AddCourse() {
  const [course, setCourse] = useState({
    courseName: '',
    courseDesc: '',
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    debugger;
    axios.post(`http://localhost:8082/course`, course).then((result)=>{
        if(result.data.status == 'success'){
            alert('Course Added')
        }
    })

    console.log('Course Added');
    setCourse({ courseName: '', courseDesc: '' });
  };

  return (
    <>
      <h2 className="text-center my-4">Add New Course</h2>
      <section className="container col-md-8">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course Description</label>
            <textarea
              name="courseDesc"
              value={course.courseDesc}
              onChange={handleChange}
              className="form-control"
              rows="2"
              required
            ></textarea>
          </div>

          <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddCourse;
