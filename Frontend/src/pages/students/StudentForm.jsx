import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../store/slices/studentsSlice';
import FormInput from '../../components/common/FormInput';

const StudentForm = ({ student, mode, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    class: '',
    section: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    parentName: '',
    parentPhone: ''
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (student && mode === 'edit') {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        rollNumber: student.rollNumber || '',
        class: student.class || '',
        section: student.section || '',
        phone: student.phone || '',
        address: student.address || '',
        dateOfBirth: student.dateOfBirth || '',
        gender: student.gender || '',
        parentName: student.parentName || '',
        parentPhone: student.parentPhone || ''
      });
    }
  }, [student, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
    }

    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
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

  const handleSubmit = () => {
    if (validateForm()) {
      if (mode === 'add') {
        dispatch(addStudent(formData));
      } else if (mode === 'edit') {
        dispatch(updateStudent({ id: student.id, studentData: formData }));
      }
      onSuccess();
    }
  };

  if (mode === 'view') {
    return (
      <Row>
        <Col md={12} className="text-center mb-4">
          <img
            src={student?.avatar || 'https://via.placeholder.com/150?text=Student'}
            alt={formData.name || 'Student'}
            className="rounded-circle mb-3 profile-image"
            width="120"
            height="120"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/120x120?text=Student';
            }}
          />
          <h4>{formData.name}</h4>
          <p className="text-muted">{formData.rollNumber}</p>
        </Col>
        <Col md={6}>
          <FormInput
            label="Name"
            value={formData.name}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Email"
            value={formData.email}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Roll Number"
            value={formData.rollNumber}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Class"
            value={formData.class}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Section"
            value={formData.section}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Phone"
            value={formData.phone}
            disabled
          />
        </Col>
        <Col md={12}>
          <FormInput
            label="Address"
            value={formData.address}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Date of Birth"
            value={formData.dateOfBirth}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Gender"
            value={formData.gender}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Parent Name"
            value={formData.parentName}
            disabled
          />
        </Col>
        <Col md={6}>
          <FormInput
            label="Parent Phone"
            value={formData.parentPhone}
            disabled
          />
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {mode === 'edit' && student?.avatar && (
        <Col md={12} className="text-center mb-4">
          <img
            src={student.avatar}
            alt={formData.name || 'Student'}
            className="rounded-circle mb-3 profile-image"
            width="100"
            height="100"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100x100?text=Student';
            }}
          />
          <p className="text-muted">Current Profile Photo</p>
        </Col>
      )}
      <Col md={6}>
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          error={errors.name}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Enter roll number"
          error={errors.rollNumber}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Enter class"
          error={errors.class}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Enter section"
          error={errors.section}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          error={errors.phone}
          required
        />
      </Col>
      <Col md={12}>
        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          error={errors.address}
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <FormInput
          label="Parent Name"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          placeholder="Enter parent name"
          error={errors.parentName}
          required
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Parent Phone"
          name="parentPhone"
          value={formData.parentPhone}
          onChange={handleChange}
          placeholder="Enter parent phone"
          error={errors.parentPhone}
        />
      </Col>
    </Row>
  );
};

export default StudentForm;
