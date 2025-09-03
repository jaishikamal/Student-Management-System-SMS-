import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { store } from './store';
import './styles/backgrounds.css';
import './utils/consoleFilter'; // Suppress React Router warnings

// Layout Components
import MainNavbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Students
import Students from './pages/students/Students';
import MySubjects from './pages/students/MySubjects';
import MyAttendance from './pages/students/MyAttendance';
import MyGrades from './pages/students/MyGrades';
import MyAssignments from './pages/students/MyAssignments';
import MyExamSchedule from './pages/students/MyExamSchedule';

// Library Management
import Library from './pages/library/Library';

// Examination Management
import Examination from './pages/examination/Examination';

// Timetable Management
import Timetable from './pages/timetable/Timetable';

// Main Layout Component
const MainLayout = ({ children }) => {
  const { sidebarCollapsed } = store.getState().ui;

  return (
    <div className="d-flex flex-column min-vh-100">
      <MainNavbar />
      <div className="flex-grow-1 d-flex">
        {/* Desktop Sidebar */}
        <div
          className="d-none d-lg-block"
          style={{
            width: sidebarCollapsed ? '60px' : '250px',
            minWidth: sidebarCollapsed ? '60px' : '250px',
            transition: 'width 0.3s ease'
          }}
        >
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className="d-lg-none mobile-sidebar-overlay" id="mobileSidebar">
          <div className="mobile-sidebar">
            <Sidebar />
          </div>
        </div>

        <div className="flex-grow-1">
          <div className="main-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = store.getState().auth;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes - Redirect to dashboard if already logged in */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected Routes - Require Authentication */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Students Management - All roles can access */}
          <Route path="/students" element={
            <ProtectedRoute>
              <MainLayout>
                <Students />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Student - My Subjects */}
          <Route path="/my-subjects" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout>
                <MySubjects />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Student - My Attendance */}
          <Route path="/my-attendance" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout>
                <MyAttendance />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Student - My Grades */}
          <Route path="/my-grades" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout>
                <MyGrades />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Student - My Assignments */}
          <Route path="/my-assignments" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout>
                <MyAssignments />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Student - My Exam Schedule */}
          <Route path="/my-exams" element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout>
                <MyExamSchedule />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Library Management - All roles can access */}
          <Route path="/library" element={
            <ProtectedRoute>
              <MainLayout>
                <Library />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Examination Management - All roles can access */}
          <Route path="/examination" element={
            <ProtectedRoute>
              <MainLayout>
                <Examination />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Timetable Management - All roles can access */}
          <Route path="/timetable" element={
            <ProtectedRoute>
              <MainLayout>
                <Timetable />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* Admin-only routes can be added here with role restrictions */}
          {/* Example:
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <AdminPanel />
              </MainLayout>
            </ProtectedRoute>
          } />
          */}

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

