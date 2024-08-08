"use client";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ModelPopupType from "./builders/ModelPopupType";

export default function InsertElement() {
 
    const [isModalVisible, setIsModalVisible] = useState(false);   const showModal = () => {
        setIsModalVisible(true);
      };
      return (
 <>
  
    <div className=""> 
        <Button
          className="h-auto font-bold py-2 px-4 w-[290px]"
          onClick={showModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus w-5 h-5 text-zinc-500"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg> 
          Insert Element
        </Button>
      </div>
    

    {/* Modal for selecting input type */}
    {isModalVisible && (
      <ModelPopupType
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    )} </>
  )
}
