import React from 'react';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaBell,
  FaBars
} from 'react-icons/fa';
import { logout } from '../../store/slices/authSlice';
import { toggleDarkMode, toggleSidebar } from '../../store/slices/uiSlice';
import Logo from '../common/Logo';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { darkMode, notifications } = useSelector(state => state.ui);

  // Close mobile sidebar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileSidebar = document.getElementById('mobileSidebar');
      const sidebarToggle = document.querySelector('.navbar .btn-link');

      if (mobileSidebar && mobileSidebar.classList.contains('show')) {
        if (!mobileSidebar.contains(event.target) && !sidebarToggle?.contains(event.target)) {
          mobileSidebar.classList.remove('show');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());

    // Handle mobile sidebar
    const mobileSidebar = document.getElementById('mobileSidebar');
    if (mobileSidebar) {
      if (mobileSidebar.classList.contains('show')) {
        mobileSidebar.classList.remove('show');
      } else {
        mobileSidebar.classList.add('show');
      }
    }
  };

  const getRoleDisplayName = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className="border-bottom shadow-sm"
    >
      <Container fluid>
        <Button
          variant="link"
          className="p-0 me-3 d-lg-none"
          onClick={handleSidebarToggle}
        >
          <FaBars />
        </Button>

        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <Logo size="medium" className="me-2" />
          <span className="d-none d-sm-inline">Student Management System</span>
          <span className="d-sm-none">SMS</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Dark Mode Toggle */}
            <Nav.Item className="d-flex align-items-center me-3">
              <Button
                variant="link"
                className="p-0"
                onClick={handleDarkModeToggle}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </Button>
            </Nav.Item>

            {/* Notifications */}
            <Nav.Item className="d-flex align-items-center me-3">
              <Dropdown>
                <Dropdown.Toggle variant="link" className="p-0 position-relative">
                  <FaBell />
                  {notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications.length}
                    </span>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {notifications.length === 0 ? (
                    <Dropdown.Item disabled>No notifications</Dropdown.Item>
                  ) : (
                    notifications.map(notification => (
                      <Dropdown.Item key={notification.id}>
                        {notification.message}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>

            {/* User Menu */}
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle variant="link" className="d-flex align-items-center text-decoration-none">
                  <img
                    src={user?.avatar || 'https://via.placeholder.com/32'}
                    alt="User"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span className="d-none d-md-inline">
                    {user?.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <div className="fw-bold">{user?.name}</div>
                    <small className="text-muted">{getRoleDisplayName(user?.role)}</small>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    <FaUser className="me-2" />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
