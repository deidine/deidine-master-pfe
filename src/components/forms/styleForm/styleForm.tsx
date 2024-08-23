"use client";
import React, { useState } from 'react';  
import PreviewStyleForm from '../previews/PreviewStyleForm'; 
import StylingButton from './allStylePattern/stylingButton';
import StylingElements from './allStylePattern/stylingElements';
import StylingForm from './allStylePattern/stylingForm';
import StylingParagraph from './allStylePattern/stylingParagraph';

export default function StyleForm( ) {   
  return (
    <div className='flex relative justify-center py-20 items-center  w-full h-full '>
      <PreviewStyleForm />
     
     <div className="top-[118px] pt-[100px] fixed p-4  flex flex-col justify-start  
     right-0 w-[20%] h-[calc(100vh-118px)] overflow-auto bg-white">
         <div className='rounded-lg border-b-[1px]  border-gray-200  mb-4 p-4'> <StylingForm currentStyling="Form" /></div>
         <div className='rounded-lg border-b-[1px]  border-gray-200  mb-4 p-4'> <StylingElements currentStyling="Elements" /></div>
         <div className='rounded-lg border-b-[1px]  border-gray-200  mb-4 p-4'> <StylingButton currentStyling="Buttons" /></div>
         <div className='rounded-lg border-b-[1px]  border-gray-200  mb-4 p-4'> <StylingParagraph currentStyling="Paragraph" /></div>
        </div>
    </div>
  );
}