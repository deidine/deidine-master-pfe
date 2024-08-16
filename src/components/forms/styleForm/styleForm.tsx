"use client";
import React, { useState } from 'react';  
import PreviewStyleForm from '../previews/PreviewStyleForm'; 
import StylingButton from './allStylePattern/stylingButton';
import StylingElements from './allStylePattern/stylingElements';
import StylingForm from './allStylePattern/stylingForm';

export default function StyleForm( ) {   
  return (
    <div className='flex relative justify-center items-center  w-full h-full '>
      <PreviewStyleForm />
     
     <div className="-top-[10px] absolute  p-4  flex flex-col justify-start  right-0 w-[20%] h-[calc(100vh-80px)] overflow-auto bg-white">
         <div className='rounded-lg border-2 mb-4 p-4'> <StylingForm currentStyling="Form" /></div>
         <div className='rounded-lg border-2 mb-4 p-4'> <StylingElements currentStyling="Elements" /></div>
         <div className='rounded-lg border-2 mb-4 p-4'> <StylingButton currentStyling="Buttons" /></div>
        </div>
    </div>
  );
}