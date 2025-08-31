import React from 'react';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`d-flex align-items-center ${className}`}>
      {/* School/Education themed SVG logo */}
      <svg
        className={`${sizeClasses[size]} me-2`}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
      </svg>
      <span className="fw-bold">SMS</span>
    </div>
  );
};

export default Logo;
