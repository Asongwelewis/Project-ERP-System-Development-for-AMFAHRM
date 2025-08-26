import React from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
  default: 'bg-orange-100 text-orange-800',
  secondary: 'bg-gray-100 text-gray-800',
  outline: 'border border-gray-300 text-gray-700 bg-white',
  success: 'bg-green-100 text-green-800',
  destructive: 'bg-red-100 text-red-800',
};

export function Badge({ children, className = '', variant = 'default', ...props }) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
