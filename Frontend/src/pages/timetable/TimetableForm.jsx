import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TimetableForm = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Create New Timetable</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Timetable creation form will be implemented here.</p>
        <p>This will allow creating weekly schedules for classes with period assignments.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimetableForm;
