import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { addBook } from '../../store/slices/librarySlice';

const BookForm = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    totalCopies: 1,
    location: '',
    publishedYear: new Date().getFullYear(),
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(addBook(formData)).unwrap();
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      totalCopies: 1,
      location: '',
      publishedYear: new Date().getFullYear(),
      description: ''
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
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author *</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>ISBN *</Form.Label>
              <Form.Control
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Category *</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Academic">Academic</option>
                <option value="Reference">Reference</option>
                <option value="Biography">Biography</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Literature">Literature</option>
              </Form.Select>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Total Copies *</Form.Label>
              <Form.Control
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="number"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear() + 1}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Shelf A1"
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the book..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BookForm;
