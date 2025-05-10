"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Appbar } from "../shared/Appbar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Appbar />
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};
