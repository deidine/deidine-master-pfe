"use client";

import React, { useEffect, useState } from "react";
import { LocaleProvider } from "@douyinfe/semi-ui";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";

import "./i18n/i18n";

export default function LocalProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once client-side rendering is confirmed
  }, []);

  if (!isClient) {
    return null; // or a loading spinner, skeleton UI, etc.
  }

  return <LocaleProvider locale={en_US}>{children}</LocaleProvider>;
}
