import React from 'react';


export function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-lg border bg-white dark:bg-gray-900 shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b-0 bg-transparent rounded-t-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>{children}</h2>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>{children}</p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>{children}</div>
  );
}
