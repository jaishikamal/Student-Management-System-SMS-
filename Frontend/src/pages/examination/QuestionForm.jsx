import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuestionForm = ({ show, onHide, selectedExam, onSuccess }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedExam ? `Add Questions to ${selectedExam.title}` : 'Add Questions'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Question form component will be implemented here.</p>
        <p>This will allow adding multiple choice and essay questions to exams.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionForm;
