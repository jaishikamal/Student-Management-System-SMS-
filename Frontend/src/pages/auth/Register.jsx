import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash, FaSchool, FaUser, FaLock, FaEnvelope, FaUserTag } from 'react-icons/fa';
import { registerUser, clearError } from '../../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...registrationData } = formData;
      try {
        const result = await dispatch(registerUser(registrationData));
        if (registerUser.fulfilled.match(result)) {
          console.log('Registration successful:', result.payload);
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(28px)', transform: 'scale(1.1)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' }} />
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="section-container w-100">
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
                    <FaSchool size={40} className="text-primary" />
                  </div>
                  <h1 className="h2 text-white fw-bold mb-2">Student Management System</h1>
                  <p className="text-white-50 mb-0">Create your account to get started</p>
                </div>

                <Card className="border-0 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(16px)' }}>
                  <Card.Body className="p-3 p-md-4">
                    <div className="text-center mb-4">
                      <div className="d-inline-flex align-items-center justify-content-center bg-success rounded-circle mb-3" style={{ width: '60px', height: '60px' }}>
                        <FaUserPlus size={24} className="text-white" />
                      </div>
                      <h2 className="h4 fw-bold mb-2">Create Account</h2>
                      <p className="text-muted mb-0">Fill in your details to register</p>
                    </div>

                    {error && (
                      <Alert variant="danger" dismissible onClose={() => dispatch(clearError())} className="mb-4">
                        <div className="d-flex align-items-center">
                          <FaUser className="me-2" />
                          {error}
                        </div>
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <FaUser className="me-2 text-muted" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          isInvalid={!!errors.name}
                          className="py-3"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <FaEnvelope className="me-2 text-muted" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          isInvalid={!!errors.email}
                          className="py-3"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <FaUserTag className="me-2 text-muted" />
                          Role
                        </Form.Label>
                        <Form.Select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          isInvalid={!!errors.role}
                          className="py-3"
                          required
                        >
                          <option value="">Select your role</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="admin">Administrator</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.role}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <FaLock className="me-2 text-muted" />
                          Password
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            isInvalid={!!errors.password}
                            className="py-3"
                            required
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="position-absolute end-0 top-0 h-100 border-0 text-muted"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 10 }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <FaLock className="me-2 text-muted" />
                          Confirm Password
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            isInvalid={!!errors.confirmPassword}
                            className="py-3"
                            required
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="position-absolute end-0 top-0 h-100 border-0 text-muted"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ zIndex: 10 }}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        className="w-100 mb-4 py-3 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <FaUserPlus className="me-2" />
                            Create Account
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="mb-0 text-muted">
                          Already have an account?{' '}
                          <Link to="/login" className="text-decoration-none fw-semibold">
                            Sign in here
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Register;
