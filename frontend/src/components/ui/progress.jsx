import React from 'react';

export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`h-2 w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
