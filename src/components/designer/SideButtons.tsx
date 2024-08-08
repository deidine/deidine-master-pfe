"use client"; 
import React, { useState } from 'react'; 
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator"; 
import { Button } from 'antd';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";


export default function SideButtons({ onPreview }: { onPreview: (value: boolean) => void }) {
  const [selectedButton, setSelectedButton] = useState<'preview' | 'field' | 'design'>('field');

  return (
    <div className="flex fixed pt-[80px] border-black border-r-[0.5px] bg-white w-[150px] h-[100vh]
    flex-col items-center justify-start top-0 gap-[23%]">
      <div className="flex flex-col gap-2 ">
           <Button
          className={`btn_header ${selectedButton === 'field' ? "bg-blue-300 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(false);
            setSelectedButton('field');
          }}
        >
          <FiEdit/>
          Field
        </Button>
            <Button
          className={`btn_header ${selectedButton === 'preview' ? "bg-blue-300 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(true);
            setSelectedButton('preview');
          }}
        >
          <MdOutlinePreview/>
          Preview
        </Button>
 
        <Button
          className={`btn_header ${selectedButton === 'design' ? "bg-blue-300 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            // Add your logic for the design button here
            setSelectedButton('design');
          }}
        > 
          <MdOutlineDesignServices/>
          Design
        </Button>
       
        <FormCodeGenerator />
      </div>
    </div>
  );
}
