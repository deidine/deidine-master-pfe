import React from 'react'

export default function UnderLine({title}: { title: string }) {
  return (
    <div className="px-[4.5rem] font-semibold w-1/2  text-black mt-[1rem] ">
      
    <div className="py-10">
    <span className="font-bold text-lg">
    {title}
    </span>
    <span className="block h-1 w-[30%] mt-1 bg-buttonColor  "></span>
  </div>
  </div>
  
)
}
// il vau etre me niveua
// reduce feature to the here