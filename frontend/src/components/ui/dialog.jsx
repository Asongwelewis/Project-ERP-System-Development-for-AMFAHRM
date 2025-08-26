import React from 'react';
import { twMerge } from 'tailwind-merge';

const DialogContext = React.createContext({ open: false, onOpenChange: () => {} });

export function Dialog({ open = false, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange?.(true)
    });
  }

  return (
    <button onClick={() => onOpenChange?.(true)}>
      {children}
    </button>
  );
}

export function DialogContent({ className = '', children, ...props }) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  React.useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') onOpenChange?.(false);
    }
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange?.(false)} />
      <div className={twMerge("relative z-10 w-full max-w-lg rounded-md bg-white p-4 shadow-lg", className)} {...props}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = '', ...props }) {
  return <div className={twMerge('mb-2', className)} {...props} />;
}
export function DialogTitle({ className = '', children, ...props }) {
  return <h3 className={twMerge('text-lg font-semibold', className)} {...props}>{children}</h3>;
}
export function DialogDescription({ className = '', ...props }) {
  return <p className={twMerge('text-sm text-gray-600', className)} {...props} />;
}
export function DialogFooter({ className = '', ...props }) {
  return <div className={twMerge('mt-4 flex justify-end gap-2', className)} {...props} />;
}
