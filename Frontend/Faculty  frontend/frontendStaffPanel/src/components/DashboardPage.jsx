import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const dummyData = {
    user: {
      name: 'John Doe',
      role: 'Faculty'
    },
    stats: {
      totalStudents: 120,
      totalAssignments: 15
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {dummyData.user.name}</h2>
      <p>Role: {dummyData.user.role}</p>
      <div className="stats">
        <p>Total Students: {dummyData.stats.totalStudents}</p>
        <p>Total Assignments: {dummyData.stats.totalAssignments}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
