"use client";

import React from 'react';
import { LocaleProvider } from "@douyinfe/semi-ui";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";

import "@/i18n/i18n";

export default function LocalProvider({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") {
    // Prevent execution during SSR
    return null;
  }  
  
  return (
    <LocaleProvider locale={en_US}>
      {children}
    </LocaleProvider>
  );
}
