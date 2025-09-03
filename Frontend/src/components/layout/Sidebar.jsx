import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaCalendarAlt,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaBook,
  FaClipboardList,
  FaFileAlt as FaExam,
  FaCalendarWeek
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const { darkMode, sidebarCollapsed } = useSelector(state => state.ui);

  const getNavItems = () => {
    const baseItems = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <FaTachometerAlt />
      }
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        {
          path: '/students',
          label: 'Students',
          icon: <FaUsers />
        },
        {
          path: '/teachers',
          label: 'Teachers',
          icon: <FaChalkboardTeacher />
        },
        {
          path: '/classes',
          label: 'Classes',
          icon: <FaGraduationCap />
        },
        {
          path: '/attendance',
          label: 'Attendance',
          icon: <FaCalendarAlt />
        },
        {
          path: '/grades',
          label: 'Grades',
          icon: <FaChartBar />
        },
        {
          path: '/assignments',
          label: 'Assignments',
          icon: <FaFileAlt />
        },
        {
          path: '/library',
          label: 'Library',
          icon: <FaBook />
        },
        {
          path: '/examination',
          label: 'Examinations',
          icon: <FaExam />
        },
        {
          path: '/timetable',
          label: 'Timetable',
          icon: <FaCalendarWeek />
        },
        {
          path: '/settings',
          label: 'Settings',
          icon: <FaCog />
        }
      ];
    } else if (user?.role === 'teacher') {
      return [
        ...baseItems,
        {
          path: '/my-classes',
          label: 'My Classes',
          icon: <FaBook />
        },
        {
          path: '/attendance',
          label: 'Mark Attendance',
          icon: <FaCalendarAlt />
        },
        {
          path: '/grades',
          label: 'Manage Grades',
          icon: <FaChartBar />
        },
        {
          path: '/assignments',
          label: 'Assignments',
          icon: <FaFileAlt />
        },
        {
          path: '/library',
          label: 'Library',
          icon: <FaBook />
        },
        {
          path: '/examination',
          label: 'Examinations',
          icon: <FaExam />
        },
        {
          path: '/timetable',
          label: 'Timetable',
          icon: <FaCalendarWeek />
        }
      ];
    } else if (user?.role === 'student') {
      return [
        ...baseItems,
        {
          path: '/my-subjects',
          label: 'My Subjects',
          icon: <FaBook />
        },
        {
          path: '/my-attendance',
          label: 'My Attendance',
          icon: <FaCalendarAlt />
        },
        {
          path: '/my-grades',
          label: 'My Grades',
          icon: <FaChartBar />
        },
        {
          path: '/my-assignments',
          label: 'My Assignments',
          icon: <FaFileAlt />
        },
        {
          path: '/my-exams',
          label: 'Exam Schedule',
          icon: <FaExam />
        },
        {
          path: '/assignments',
          label: 'All Assignments',
          icon: <FaClipboardList />
        },
        {
          path: '/library',
          label: 'Library',
          icon: <FaBook />
        },
        {
          path: '/examination',
          label: 'Examinations',
          icon: <FaExam />
        },
        {
          path: '/timetable',
          label: 'Timetable',
          icon: <FaCalendarWeek />
        }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className={`sidebar ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <Nav className="flex-column p-3">
        {navItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link
              onClick={() => navigate(item.path)}
              className={`d-flex align-items-center mb-2 ${location.pathname === item.path ? 'active' : ''
                }`}
            >
              <span className="me-3">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
