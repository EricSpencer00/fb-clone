"use client";

import React, { createContext, useContext, useState, ReactNode, ReactElement } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

const Dialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

const DialogTrigger = ({ children, asChild }: { children?: ReactNode; asChild?: boolean }) => {
  const ctx = useContext(DialogContext);
  if (!ctx) return children ?? null;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        ctx.setOpen(true);
        const childOnClick = (children as any).props?.onClick;
        if (typeof childOnClick === "function") childOnClick(e);
      },
    });
  }
  return (
    <button
      onClick={() => ctx.setOpen(true)}
      className="px-3 py-2 rounded bg-gray-50 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};

const DialogPortal = ({ children }: { children: ReactNode }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

const DialogClose = ({ children, asChild }: { children?: ReactNode; asChild?: boolean }) => {
  const ctx = useContext(DialogContext);
  if (!ctx) return <>{children}</>;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        ctx.setOpen(false);
        const childOnClick = (children as any).props?.onClick;
        if (typeof childOnClick === "function") childOnClick(e);
      },
    });
  }
  return (
    <button
      onClick={() => ctx.setOpen(false)}
      className="inline-flex items-center justify-center rounded p-1 hover:bg-gray-100"
    >
      {children ?? <span className="sr-only">Close</span>}
    </button>
  );
};

const DialogOverlay = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={cn("fixed inset-0 z-[101] bg-black/60 backdrop-blur-sm", className)}
  />
);

const DialogContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;
  if (!ctx.open) return null;
  return (
    <DialogPortal>
      <DialogOverlay onClick={() => ctx.setOpen(false)} />
      <div className={cn("fixed left-1/2 top-1/2 z-[102] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow-lg", className)}>
        {children}
        <div className="absolute right-3 top-3">
          <DialogClose>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </DialogClose>
        </div>
      </div>
    </DialogPortal>
  );
};

const DialogHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = ({ className = "", children }: { className?: string; children?: ReactNode }) => (
  <div className={cn("text-lg font-semibold tracking-tight", className)}>{children}</div>
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ className = "", children }: { className?: string; children?: ReactNode }) => (
  <div className={cn("text-sm text-muted-foreground", className)}>{children}</div>
);
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
