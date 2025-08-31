import React, { useEffect } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaCalendarAlt,
  FaChartBar,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { fetchStudents } from '../../store/slices/studentsSlice';
import { fetchTeachers } from '../../store/slices/teachersSlice';
import { fetchClasses } from '../../store/slices/classesSlice';
import { fetchAttendance } from '../../store/slices/attendanceSlice';
import { fetchGrades } from '../../store/slices/gradesSlice';
import { fetchAssignments } from '../../store/slices/assignmentsSlice';
import CardBox from '../../components/common/CardBox';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { students, loading: studentsLoading } = useSelector(state => state.students);
  const { teachers, loading: teachersLoading } = useSelector(state => state.teachers);
  const { classes, loading: classesLoading } = useSelector(state => state.classes);
  const { attendance, loading: attendanceLoading } = useSelector(state => state.attendance);
  const { grades, loading: gradesLoading } = useSelector(state => state.grades);
  const { assignments, loading: assignmentsLoading } = useSelector(state => state.assignments);

  useEffect(() => {
    // Load data based on user role
    if (user?.role === 'admin') {
      dispatch(fetchStudents());
      dispatch(fetchTeachers());
      dispatch(fetchClasses());
      dispatch(fetchAttendance());
      dispatch(fetchGrades());
      dispatch(fetchAssignments());
    } else if (user?.role === 'teacher') {
      dispatch(fetchStudents());
      dispatch(fetchAttendance());
      dispatch(fetchGrades());
      dispatch(fetchAssignments());
    } else if (user?.role === 'student') {
      dispatch(fetchGrades());
      dispatch(fetchAssignments());
    }
  }, [dispatch, user?.role]);

  const getAdminStats = () => [
    {
      title: 'Total Students',
      value: students.length,
      icon: <FaUsers size={24} />,
      variant: 'primary',
      subtitle: 'Active students'
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      icon: <FaChalkboardTeacher size={24} />,
      variant: 'success',
      subtitle: 'Active teachers'
    },
    {
      title: 'Total Classes',
      value: classes.length,
      icon: <FaGraduationCap size={24} />,
      variant: 'info',
      subtitle: 'Active classes'
    },
    {
      title: 'Today\'s Attendance',
      value: attendance.length > 0 ? attendance[0]?.students?.length || 0 : 0,
      icon: <FaCalendarAlt size={24} />,
      variant: 'warning',
      subtitle: 'Students present today'
    }
  ];

  const getTeacherStats = () => [
    {
      title: 'My Students',
      value: students.length,
      icon: <FaUsers size={24} />,
      variant: 'primary',
      subtitle: 'Students in my classes'
    },
    {
      title: 'My Classes',
      value: classes.filter(c => c.teacher === user?.name).length,
      icon: <FaGraduationCap size={24} />,
      variant: 'success',
      subtitle: 'Classes I teach'
    },
    {
      title: 'Pending Grades',
      value: grades.filter(g => g.teacher === user?.name).length,
      icon: <FaChartBar size={24} />,
      variant: 'warning',
      subtitle: 'Grades to be entered'
    },
    {
      title: 'Active Assignments',
      value: assignments.filter(a => a.teacher === user?.name).length,
      icon: <FaFileAlt size={24} />,
      variant: 'info',
      subtitle: 'Current assignments'
    }
  ];

  const getStudentStats = () => [
    {
      title: 'My Subjects',
      value: classes.length,
      icon: <FaGraduationCap size={24} />,
      variant: 'primary',
      subtitle: 'Subjects enrolled'
    },
    {
      title: 'My Grades',
      value: grades.filter(g => g.studentId === user?.id).length,
      icon: <FaChartBar size={24} />,
      variant: 'success',
      subtitle: 'Grades received'
    },
    {
      title: 'My Assignments',
      value: assignments.length,
      icon: <FaFileAlt size={24} />,
      variant: 'warning',
      subtitle: 'Pending assignments'
    },
    {
      title: 'Attendance Rate',
      value: '85%',
      icon: <FaCalendarAlt size={24} />,
      variant: 'info',
      subtitle: 'This month'
    }
  ];

  const getRecentActivities = () => {
    const activities = [];

    if (user?.role === 'admin') {
      activities.push(
        { text: 'New student registered', time: '2 hours ago', type: 'info' },
        { text: 'Attendance marked for Class 10A', time: '4 hours ago', type: 'success' },
        { text: 'New assignment uploaded', time: '6 hours ago', type: 'warning' }
      );
    } else if (user?.role === 'teacher') {
      activities.push(
        { text: 'Grades updated for Mathematics', time: '1 hour ago', type: 'success' },
        { text: 'Attendance marked for Class 10A', time: '3 hours ago', type: 'info' },
        { text: 'New assignment created', time: '5 hours ago', type: 'warning' }
      );
    } else if (user?.role === 'student') {
      activities.push(
        { text: 'New grade received in Mathematics', time: '2 hours ago', type: 'success' },
        { text: 'Assignment submitted', time: '4 hours ago', type: 'info' },
        { text: 'New assignment available', time: '6 hours ago', type: 'warning' }
      );
    }

    return activities;
  };

  const getStats = () => {
    switch (user?.role) {
      case 'admin':
        return getAdminStats();
      case 'teacher':
        return getTeacherStats();
      case 'student':
        return getStudentStats();
      default:
        return [];
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-success" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'info':
        return <FaClock className="text-info" />;
      default:
        return <FaClock className="text-muted" />;
    }
  };

  const stats = getStats();
  const activities = getRecentActivities();

  return (
    <div className="dashboard-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">Dashboard</h1>
            <p className="text-muted">Welcome back, {user?.name}!</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row className="mb-4">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
              <CardBox
                title={stat.title}
                subtitle={stat.subtitle}
                icon={stat.icon}
                variant={stat.variant}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="mb-0 fw-bold">{stat.value}</h2>
                  </div>
                </div>
              </CardBox>
            </Col>
          ))}
        </Row>

        {/* Recent Activities */}
        <Row>
          <Col lg={8} className="mb-4">
            <CardBox title="Recent Activities" icon={<FaClock size={20} />}>
              <div className="list-group list-group-flush">
                {activities.map((activity, index) => (
                  <div key={index} className="list-group-item d-flex align-items-center border-0 px-0">
                    <div className="me-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">{activity.text}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </CardBox>
          </Col>

          <Col lg={4} className="mb-4">
            <CardBox title="Quick Actions" icon={<FaClock size={20} />}>
              <div className="d-grid gap-2">
                {user?.role === 'admin' && (
                  <>
                    <button className="btn btn-outline-primary btn-sm">Add New Student</button>
                    <button className="btn btn-outline-success btn-sm">Add New Teacher</button>
                    <button className="btn btn-outline-info btn-sm">Create Class</button>
                  </>
                )}
                {user?.role === 'teacher' && (
                  <>
                    <button className="btn btn-outline-primary btn-sm">Mark Attendance</button>
                    <button className="btn btn-outline-success btn-sm">Add Grades</button>
                    <button className="btn btn-outline-info btn-sm">Upload Assignment</button>
                  </>
                )}
                {user?.role === 'student' && (
                  <>
                    <button className="btn btn-outline-primary btn-sm">View Grades</button>
                    <button className="btn btn-outline-success btn-sm">Check Attendance</button>
                    <button className="btn btn-outline-info btn-sm">Download Assignment</button>
                  </>
                )}
              </div>
            </CardBox>
          </Col>
        </Row>
             </div>
     </div>
   );
};

export default Dashboard;
