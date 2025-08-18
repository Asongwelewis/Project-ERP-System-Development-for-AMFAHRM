import React from 'react';


export function Button({ children, className = '', size = 'md', ...props }) {
  const sizeClass = size === 'lg' ? 'py-3 px-6 text-base' : 'py-2 px-4 text-sm';
  return (
    <button
      className={`rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
