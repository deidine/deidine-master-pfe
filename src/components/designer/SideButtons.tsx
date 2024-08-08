"use client"; 
import React, { useEffect, useState, useRef } from 'react'; 
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator"; 
import { Button } from 'antd';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";


export default function SideButtons({  onPreview }: {   onPreview: (value: boolean) => void }) {
  const [preview, setPreview] = useState(false);


  return (
    <div className="flex fixed pt-[80px] border-black border-r-[0.5px] bg-white w-[150px] h-[100vh]
    flex-col items-center justify-start top-0 gap-[23%]">
      <div className="flex flex-col  gap-2 ">
        <Button
          className={`btn_header ${!preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(true);
            setPreview(true);
          }}
        >
          <MdOutlinePreview/>
          Preview
        </Button>
        <Button
          className={`btn_header ${preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(false);
            setPreview(false);
          }}
        ><FiEdit/>
          Field
        </Button>
       
        <Button
          className={`btn_header ${preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
         
        > 
          < MdOutlineDesignServices/>
          Design
        </Button>
       
        <FormCodeGenerator />
      </div>
    </div>
  );
}