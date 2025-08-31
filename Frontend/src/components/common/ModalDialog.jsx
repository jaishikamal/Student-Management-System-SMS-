import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDialog = ({
  show,
  onHide,
  title,
  children,
  size = 'lg',
  centered = true,
  backdrop = 'static',
  keyboard = false,
  confirmText = 'Save',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  confirmDisabled = false,
  className = ''
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop={backdrop}
      keyboard={keyboard}
      className={className}
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      
      <Modal.Body>
        {children}
      </Modal.Body>
      
      {(onConfirm || onCancel) && (
        <Modal.Footer>
          {onCancel && (
            <Button variant="secondary" onClick={handleCancel} disabled={loading}>
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button 
              variant="primary" 
              onClick={handleConfirm} 
              disabled={loading || confirmDisabled}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                confirmText
              )}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalDialog;
