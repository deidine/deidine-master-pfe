"use client";
import React, { useState } from 'react';  
import PreviewStyleForm from '../previews/PreviewStyleForm';
import useStyle from '@/hooks/useStyle';

export default function StyleForm({
  form
}: {form: Form}) {  
  const{formStyle}=useStyle()
  return (
    <div className='flex justify-center  w-full h-full '>
 
      <PreviewStyleForm form={form} />
    </div>
  );
}