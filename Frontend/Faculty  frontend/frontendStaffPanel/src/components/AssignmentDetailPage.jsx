import React, { useState, useEffect } from 'react';
import './AssignmentDetailPage.css';

const AssignmentDetailPage = ({ match }) => {
  const [assignment, setAssignment] = useState({});
  const [grade, setGrade] = useState('');

  useEffect(() => {
    // Dummy data for a specific assignment
    const dummyAssignment = {
      assignmentId: match.params.assignmentId,
      title: 'Math Assignment 1',
      description: 'Solve problems 1 to 10.'
    };
    setAssignment(dummyAssignment);
  }, [match.params.assignmentId]);

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleGradeSubmit = () => {
    console.log(`Grade submitted: ${grade}`);
  };

  return (
    <div className="assignment-detail-container">
      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>
      <div>
        <label>Grade: </label>
        <input
          type="text"
          value={grade}
          onChange={handleGradeChange}
        />
        <button onClick={handleGradeSubmit}>Submit Grade</button>
      </div>
    </div>
  );
};

export default AssignmentDetailPage;
