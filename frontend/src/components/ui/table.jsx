import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Table({ className = '', ...props }) {
  return <table className={twMerge('w-full text-sm', className)} {...props} />;
}

export function TableHeader({ className = '', ...props }) {
  return <thead className={className} {...props} />;
}

export function TableBody({ className = '', ...props }) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className = '', ...props }) {
  return <tr className={twMerge('border-b last:border-0', className)} {...props} />;
}

export function TableHead({ className = '', ...props }) {
  return <th className={twMerge('px-4 py-2 text-left font-medium', className)} {...props} />;
}

export function TableCell({ className = '', ...props }) {
  return <td className={twMerge('px-4 py-2 align-middle', className)} {...props} />;
}
