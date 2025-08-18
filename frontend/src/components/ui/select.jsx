import React from 'react';


export function Select({ value, onValueChange, children, className = '', ...props }) {
  return (
    <select
      value={value}
      onChange={e => onValueChange(e.target.value)}
      className={`block w-full rounded-md border border-orange-200 focus:border-orange-400 bg-white px-3 py-2 text-sm focus:ring-1 focus:ring-orange-400 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = '', ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <option value="" disabled>{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
