import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Tabs({ defaultValue, children, className = '' }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={className} data-tabs-value={value}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { value, setValue }) : child
      )}
    </div>
  );
}

export function TabList({ children, className = '', value, setValue }) {
  return (
    <div className={twMerge('flex gap-2 border-b border-gray-200', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { activeValue: value, setValue }) : child
      )}
    </div>
  );
}

export function Tab({ value, children, activeValue, setValue }) {
  const active = activeValue === value;
  return (
    <button
      className={twMerge(
        'px-3 py-2 text-sm -mb-px border-b-2',
        active ? 'border-orange-500 text-orange-700' : 'border-transparent text-gray-600 hover:text-gray-800'
      )}
      onClick={() => setValue(value)}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabPanel({ when, children, value }) {
  if (value !== when) return null;
  return <div className="py-4">{children}</div>;
}
