"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Light Mode</span>
        </>
      )}
    </Button>
  );
}