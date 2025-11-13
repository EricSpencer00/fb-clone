import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";

export default function SignInDialog({ children }: { children: React.ReactNode }) {
  const { login, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, close?: () => void) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) return setError("Please fill both fields");
    try {
      await login(identifier, password);
      // close the dialog if provided
      close?.();
    } catch (err) {
      setError("Sign in failed. Check credentials.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>Sign in to access your GraceNook feed.</DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleSubmit(e)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or username</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="you@example.com or username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Your password"
            />
          </div>

          {error && <div className="text-sm text-rose-600">{error}</div>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="ml-2" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
