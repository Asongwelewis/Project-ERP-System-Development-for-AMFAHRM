import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Textarea = React.forwardRef(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100',
        className
      )}
      {...props}
    />
  );
});
