import React from 'react'

export default function UnderLine({title}: { title: string }) {
  return (
    <div className="font-semibold w-1/2  text-black mt-[1rem] mx-[1rem]">
      
    <div className="py-10">
    <span className="font-bold text-lg">
    {title}
    </span>
    <span className="block h-1 w-[30%] mt-1 bg-buttonColor  "></span>
  </div>
  </div>
  
)
}
