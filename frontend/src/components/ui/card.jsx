import React from 'react';

/**
 * Card Components
 * A set of components that create a card-based UI element
 * Used throughout the dashboard for displaying information in a consistent format
 */

// Card Footer - Optional footer section with border top
export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-t ${className}`} {...props}>{children}</div>
  );
}

/**
 * Main Card container component
 * @param {React.ReactNode} children - The content to be rendered inside the card
 * @param {string} className - Additional CSS classes to apply
 * @param {Object} props - Additional props to spread to the div element
 * 
 * Usage example:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

// Card Header - Contains title and optional description
export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b-0 bg-transparent rounded-t-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

// Card Title - Main heading of the card
export function CardTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>{children}</h2>
  );
}

// Card Description - Secondary text below the title
export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>{children}</p>
  );
}

// Card Content - Main content area of the card
export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>{children}</div>
  );
}
