"use client";

import { SessionProvider } from 'next-auth/react';

export default function RecordLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
