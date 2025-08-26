import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className = '' }) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolled;

  const setValue = (v) => {
    if (!isControlled) setUncontrolled(v);
    if (onValueChange) onValueChange(v);
  };

  return (
    <div className={className} data-tabs-value={activeValue}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { activeValue, setValue }) : child
      )}
    </div>
  );
}

export function TabList({ children, className = '', activeValue, setValue }) {
  return (
    <div className={twMerge('flex gap-2 border-b border-gray-200', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { activeValue, setValue }) : child
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

export function TabPanel({ when, children, activeValue }) {
  if (activeValue !== when) return null;
  return <div className="py-4">{children}</div>;
}

// Compatibility aliases for existing usage
export const TabsList = TabList;
export const TabsTrigger = Tab;
export function TabsContent({ value, children, activeValue }) {
  if (activeValue !== value) return null;
  return <div className="py-4">{children}</div>;
}
