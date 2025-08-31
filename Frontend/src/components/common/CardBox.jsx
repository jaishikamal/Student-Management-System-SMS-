import React from 'react';
import { Card } from 'react-bootstrap';

const CardBox = ({
  title,
  subtitle,
  children,
  icon,
  variant = 'primary',
  className = '',
  onClick,
  footer,
  headerAction
}) => {
  return (
    <Card
      className={`dashboard-card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {(title || icon || headerAction) && (
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {icon && (
              <div className={`me-3 text-${variant}`}>
                {icon}
              </div>
            )}
            <div>
              {title && <Card.Title className="mb-0">{title}</Card.Title>}
              {subtitle && <small className="text-muted">{subtitle}</small>}
            </div>
          </div>
          {headerAction && (
            <div>
              {headerAction}
            </div>
          )}
        </Card.Header>
      )}

      <Card.Body>
        {children}
      </Card.Body>

      {footer && (
        <Card.Footer>
          {footer}
        </Card.Footer>
      )}
    </Card>
  );
};

export default CardBox;
