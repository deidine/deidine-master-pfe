"use client"; 
import React, { useState } from 'react';  
import { Button } from 'antd';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDesignServices ,MdOutlineCode} from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";


export default function SideButtons({  selected }: { selected :(current:'preview' | 'field' | 'design'|'codeGenerator') =>void}) {
  const [selectedButton, setSelectedButton] = useState<'preview' | 'field' | 'design' | 'codeGenerator'>('field');

  return (
    <div className="flex fixed z-30  pt-[80px]  border border-r-[2px] gap-3 bg-white w-auto p-4 h-[100vh]
    flex-col items-center justify-start top-0 ">
      <div className="flex flex-col gap-2 ">
           <div
          className={` btn_sid ${selectedButton === 'field' ? "bg-[#36b3fa]  text-white" : "bg-white"}`}
          onClick={() => { 
            setSelectedButton('field');
            selected('field');

          }}
        >
          <FiEdit/>
          Field
        </div>
            <div
          className={`btn_sid ${selectedButton === 'preview' ? "bg-[#36b3fa] text-white" : "bg-white"}`}
          onClick={() => { 
            setSelectedButton('preview');
            selected('preview');
          }}
        >
          <MdOutlinePreview/>
          Preview
        </div>
 
        <div
          className={`btn_sid ${selectedButton === 'design' ? "bg-[#36b3fa] text-white" : "bg-white"}`}
          onClick={() => {
            // Add your logic for the design button here
            setSelectedButton('design');
            selected('design');

          }}
        > 
          <MdOutlineDesignServices/>
          Design
        </div>
       
        <div
          className={`btn_sid ${selectedButton === 'codeGenerator' ? "bg-[#36b3fa] text-white" : "bg-white"}`}
          onClick={() => {
            // Add your logic for the design button here
            setSelectedButton('codeGenerator');
            selected('codeGenerator');

          }}
        > 
          <MdOutlineCode/>
          Export code
        </div>
       
      </div>
    </div>
  );
}
