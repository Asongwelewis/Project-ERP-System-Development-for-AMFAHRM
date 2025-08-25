import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            'aria-expanded': isOpen
          });
        }
        if (child.type === SelectContent) {
          return isOpen && React.cloneElement(child, {
            value,
            onValueChange: (newValue) => {
              onValueChange(newValue);
              setIsOpen(false);
            }
          });
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={twMerge(
        "flex h-10 w-full items-center justify-between rounded-md border border-orange-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 dark:bg-gray-900 dark:border-orange-800 dark:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, children }) {
  return (
    <span className="text-muted-foreground">
      {children || placeholder}
    </span>
  );
}

export function SelectContent({ children, value, onValueChange, className }) {
  return (
    <div className={twMerge(
      "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-orange-200 bg-white p-1 shadow-md animate-in fade-in-80 dark:bg-gray-900 dark:border-orange-800 w-full mt-1",
      className
    )}>
      <div className="flex flex-col gap-1">
        {React.Children.map(children, child => {
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              selected: child.props.value === value,
              onSelect: () => onValueChange(child.props.value)
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}

export function SelectItem({ children, value, selected, onSelect, className }) {
  return (
    <button
      type="button"
      className={twMerge(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:text-gray-100",
        selected && "bg-orange-50 text-orange-600 dark:bg-orange-900/30",
        className
      )}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}
