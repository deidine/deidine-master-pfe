"use client";

  import { LocaleProvider } from "@douyinfe/semi-ui";
  import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import React, { useEffect, useState } from "react"; 
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import "../i18n/i18n";

export default function LocalProvider({ children }: { children: React.ReactNode }) {

  // return  (  <LocaleProvider locale={en_US}> {children}</LocaleProvider>) 
  
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
