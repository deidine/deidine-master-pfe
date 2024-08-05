"use client";
import useDesigner from '@/hooks/useDesigner';
import { Button } from 'antd'
import React from 'react'

export default function SubmitButton() {
    const { 
        submitBtn,
        setSubmitBtn,  
      } = useDesigner();
  return (
    <div className="flex justify-center pt-6">
    <Button className="h-10 font-bold py-2 px-4 w-1/2">
      <input
        type="text"
        className="outline-none bg-transparent w-full text-center"
        value={submitBtn}
        onChange={(e) => setSubmitBtn(e.target.value)}
      />
    </Button>
  </div> 
  )
}
