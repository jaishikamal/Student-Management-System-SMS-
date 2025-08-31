import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Alert, Badge } from 'react-bootstrap';
import { returnBook, selectAllBooks } from '../../store/slices/librarySlice';

const ReturnForm = ({ show, onHide, borrowing, onSuccess }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(returnBook(borrowing.id)).unwrap();
      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to return book');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setLoading(false);
    onHide();
  };

  if (!borrowing) return null;

  const book = books.find(b => b.id === borrowing.bookId);
  const dueDate = new Date(borrowing.dueDate);
  const today = new Date();
  const isOverdue = today > dueDate;
  const daysLate = isOverdue ? Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)) : 0;
  const calculatedFine = daysLate * 0.50;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Return Book</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Alert variant="info">
            <h6>Book Details</h6>
            <strong>Title:</strong> {book?.title || 'Unknown Book'}<br />
            <strong>Student:</strong> {borrowing.studentName}<br />
            <strong>Borrow Date:</strong> {new Date(borrowing.borrowDate).toLocaleDateString()}<br />
            <strong>Due Date:</strong> {dueDate.toLocaleDateString()}
          </Alert>

          <div className="mb-3">
            <h6>Return Status</h6>
            {isOverdue ? (
              <div>
                <Badge bg="danger" className="mb-2">Overdue</Badge>
                <p className="text-danger mb-2">
                  This book is {daysLate} day{daysLate !== 1 ? 's' : ''} overdue.
                </p>
                <p className="text-danger fw-bold">
                  Fine Amount: ${calculatedFine.toFixed(2)}
                </p>
              </div>
            ) : (
              <div>
                <Badge bg="success" className="mb-2">On Time</Badge>
                <p className="text-success">No fine will be charged.</p>
              </div>
            )}
          </div>

          <Alert variant="warning">
            <strong>Note:</strong> Please ensure the book is in good condition before returning.
            Any damage may result in additional charges.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Return'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReturnForm;
