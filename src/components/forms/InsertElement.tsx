"use client";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ModelPopupType from "./builders/ModelPopupType";
import { CgAdd } from "react-icons/cg";

export default function InsertElement() {
 
    const [isModalVisible, setIsModalVisible] = useState(false);   const showModal = () => {
        setIsModalVisible(true);
      };
      return (
 <>
           <div className="w-full fixed bottom-0 flex  justify-end pr-[100px] pb-[50px] items-center right-0 shadow-lg   h-auto z-10 ">
        <button
          className="h-auto fixed btn_header text-white flex items-center justify-around  hover:bg-hoverButtonColor bg-buttonColor font-[14px] text-2xl gap-4 "
          onClick={showModal}
        >
          <CgAdd  className="w-10  h-10   text-white" />
          Add Element
        </button></div>
     
 
    {isModalVisible && (
      <ModelPopupType
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    )} </>
  )
}
