"use client";

import React, { useEffect, useState } from "react"; 
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import "./i18n/i18n";

export default function LocalProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once client-side rendering is confirmed
  }, []);

  if (!isClient) {
    return null; // or a loading spinner, skeleton UI, etc.
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
