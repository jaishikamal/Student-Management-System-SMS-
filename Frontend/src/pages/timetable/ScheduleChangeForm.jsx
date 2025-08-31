import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ScheduleChangeForm = ({ show, onHide, timetables, onSuccess }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Schedule Change Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Schedule change form will be implemented here.</p>
        <p>This will allow requesting changes to existing timetables with conflict detection.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleChangeForm;
