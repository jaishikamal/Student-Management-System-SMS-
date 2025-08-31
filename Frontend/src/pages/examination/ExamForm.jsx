import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { createExam } from '../../store/slices/examinationSlice';

const ExamForm = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    duration: 60,
    totalMarks: 100,
    startDate: '',
    endDate: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(createExam(formData)).unwrap();
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      subject: '',
      class: '',
      duration: 60,
      totalMarks: 100,
      startDate: '',
      endDate: '',
      instructions: ''
    });
    setError('');
    setLoading(false);
    onHide();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Exam</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Exam Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Subject *</Form.Label>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="Geography">Geography</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Class *</Form.Label>
              <Form.Select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="Class 9A">Class 9A</option>
                <option value="Class 9B">Class 9B</option>
                <option value="Class 10A">Class 10A</option>
                <option value="Class 10B">Class 10B</option>
                <option value="Class 11A">Class 11A</option>
                <option value="Class 11B">Class 11B</option>
                <option value="Class 12A">Class 12A</option>
                <option value="Class 12B">Class 12B</option>
              </Form.Select>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Duration (minutes) *</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
                max="180"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Total Marks *</Form.Label>
              <Form.Control
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                min="1"
                max="200"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Start Date *</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter exam instructions for students..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Exam'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ExamForm;
