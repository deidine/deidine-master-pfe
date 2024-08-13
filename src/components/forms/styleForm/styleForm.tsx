"use client";
import React, { useState } from 'react';
import PreviewForm from '../previews/PreviewForm';
import FormStyle from './FormStyle';
import ElementsStyles from './ElementsStyles';
import ButtonStyle from './ButtonStyle';

export default function StyleForm({
  form
}: {form: Form}) {
  const [activeStyle, setActiveStyle] = useState('');

  const handleStyleChange = (style: string ) => {
    console.log(`Selected style: ${style} `);
    setActiveStyle(style);
  };

  return (
    <div className='flex justify-center items-center w-full h-full bg-black'>
      <div className='w-1/4 h-full pl-40 bg-white'>
        <h1>Form</h1>
        <FormStyle form={form}  />
        <h1>Elements</h1>
        <ElementsStyles />
        <h1>Button</h1>
        <ButtonStyle />
      </div>
      <PreviewForm form={form} />
    </div>
  );
}