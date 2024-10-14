'use client';
import { StackTheme } from "@jshimko/stack";

export default function Provider({ children }) {
  return (
    <StackTheme>
      {children}
    </StackTheme>
  );
}
