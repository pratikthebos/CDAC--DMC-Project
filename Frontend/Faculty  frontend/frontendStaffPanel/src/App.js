import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import AssignmentsPage from './components/AssignmentsPage';
import StudyMaterialPage from './components/StudyMaterialPage';
import NoticesPage from './components/NoticesPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="d-flex" style={{ height: '100vh' }}>

        <div className="sidebar-container">
          <Sidebar />
        </div>

        <div className="content-container flex-grow-1">
          <Routes>
            
            <Route path="/" element={<Navigate to="/login" />} />
            
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/study-material" element={<StudyMaterialPage />} />
              <Route path="/notices" element={<NoticesPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
