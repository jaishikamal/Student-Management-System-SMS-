import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { borrowBook, selectAllBooks } from '../../store/slices/librarySlice';

const BorrowingForm = ({ show, onHide, selectedBook, onSuccess }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  
  const [formData, setFormData] = useState({
    bookId: '',
    studentId: '',
    studentName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedBook) {
      setFormData(prev => ({
        ...prev,
        bookId: selectedBook.id
      }));
    }
  }, [selectedBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(borrowBook(formData)).unwrap();
      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to borrow book');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      bookId: '',
      studentId: '',
      studentName: ''
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

  const selectedBookData = books.find(b => b.id === parseInt(formData.bookId));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Borrow Book</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Book *</Form.Label>
            <Form.Select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              required
              disabled={!!selectedBook}
            >
              <option value="">Select a book</option>
              {books
                .filter(book => book.availableCopies > 0)
                .map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} ({book.availableCopies} available)
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>

          {selectedBookData && (
            <Alert variant="info">
              <strong>Selected Book:</strong> {selectedBookData.title}<br />
              <strong>Author:</strong> {selectedBookData.author}<br />
              <strong>Available Copies:</strong> {selectedBookData.availableCopies}<br />
              <strong>Location:</strong> {selectedBookData.location}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Student ID *</Form.Label>
            <Form.Control
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter student ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Student Name *</Form.Label>
            <Form.Control
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </Form.Group>

          <Alert variant="warning">
            <strong>Note:</strong> Books are typically borrowed for 30 days. 
            Late returns will incur fines of $0.50 per day.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading || !formData.bookId}>
            {loading ? 'Processing...' : 'Borrow Book'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BorrowingForm;
