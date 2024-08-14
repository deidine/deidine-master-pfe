"use client";
import React, { useState } from 'react';  
import PreviewStyleForm from '../previews/PreviewStyleForm';

export default function StyleForm({
  form
}: {form: Form}) {
  const [activeStyle, setActiveStyle] = useState('');

  const handleStyleChange = (style: string ) => {
    console.log(`Selected style: ${style} `);
    setActiveStyle(style);
  };

  return (
    <div className='flex justify-center  w-full h-full '>

      <PreviewStyleForm form={form} />
    </div>
  );
}