import React, { createContext, useContext, useState, ReactNode, ReactElement, cloneElement } from 'react';

type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  close: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function Dialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <DialogContext.Provider value={{ open, setOpen, close }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }: { children: ReactElement; asChild?: boolean }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;
  const { setOpen } = ctx;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };
  if (asChild && React.isValidElement(children)) {
    // cast to any to avoid strict TS overload issues when cloning arbitrary elements
    return cloneElement(children as any, { onClick: handleClick } as any);
  }
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;
  const { open } = ctx;
  if (!open) return null;
  return (
    <div className="gn-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="gn-dialog-content bg-white rounded-lg shadow-lg max-w-lg w-full">{children}</div>
    </div>
  );
}

export const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="p-4 border-b">{children}</div>
);
export const DialogTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);
export const DialogDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-gray-600">{children}</p>
);
export const DialogFooter = ({ children }: { children: ReactNode }) => (
  <div className="p-4 border-t flex justify-end">{children}</div>
);

export function DialogClose({ children, asChild }: { children?: ReactElement; asChild?: boolean }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;
  const { close } = ctx;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    close();
  };
  if (asChild && children && React.isValidElement(children)) {
    return cloneElement(children as any, { onClick: handleClick } as any);
  }
  return (
    <button onClick={handleClick} className="px-3 py-1">Close</button>
  );
}

export default Dialog;
