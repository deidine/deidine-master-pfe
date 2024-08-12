"use client"; 
import React, { useState } from 'react'; 
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator"; 
import { Button } from 'antd';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";


export default function SideButtons({ onPreview,selected }: { onPreview: (value: boolean) => void ;selected :(current:'preview' | 'field' | 'design') =>void}) {
  const [selectedButton, setSelectedButton] = useState<'preview' | 'field' | 'design'>('field');

  return (
    <div className="flex fixed z-30  pt-[80px]  border border-r-[2px] gap-3 bg-white w-[110px] h-[100vh]
    flex-col items-center justify-start top-0 ">
      <div className="flex flex-col gap-2 ">
           <div
          className={` btn_sid ${selectedButton === 'field' ? "bg-[#36b3fa]  text-white" : "bg-white"}`}
          onClick={() => {
            onPreview(false);
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
            onPreview(true);
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
       
        {/* <FormCodeGenerator /> */}
      </div>
    </div>
  );
}
