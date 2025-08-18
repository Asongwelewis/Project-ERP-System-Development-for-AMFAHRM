import React from 'react';


export function Input({ className = '', ...props }) {
  return (
    <input
      className={`block w-full rounded-md border border-orange-200 focus:border-orange-400 bg-white px-3 py-2 text-sm focus:ring-1 focus:ring-orange-400 ${className}`}
      {...props}
    />
  );
}
