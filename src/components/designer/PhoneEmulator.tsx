import React from "react";

const PhoneEmulator = ({ children }:{ children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center  py-10">
      {/* <div className="bg-black w-72 h-150 rounded-3xl relative shadow-lg">
        <div className="bg-gray-700 h-6 w-1/2 absolute top-2 left-1/4 rounded-md"></div>
        <div className="bg-white w-full h-full mt-6 rounded-b-3xl"> */}
          {children}
        {/* </div>
      </div> */}
    </div>
  );
};

export default PhoneEmulator;
