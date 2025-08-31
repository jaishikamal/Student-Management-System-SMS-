import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExamResults = ({ show, onHide, exam }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {exam ? `Results for ${exam.title}` : 'Exam Results'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Exam results component will be implemented here.</p>
        <p>This will show student results, statistics, and downloadable report cards.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExamResults;
