import { Button, Checkbox } from 'antd';
import React, { useState } from 'react'

export default function RequiredComponent({
    toggleRequired,required}:{
        required:boolean;
  toggleRequired: (required: boolean) => void;
    }) {
  const [isRequired, setIsRequired] = useState(required);

  return (
    <Button size='small'    onClick={() => {
      toggleRequired(isRequired!);
      setIsRequired(!isRequired);
    }} className=" w-1/2 hover:bg-zinc-100 rounded-lg px-1 py-1">
    
    <Checkbox
      checked={isRequired}
    
      onClick={() => {
        toggleRequired(isRequired!);
        setIsRequired(!isRequired);
      }}
    >    
         <label className="text-sm leading-none font-normal  text-zinc-600">
        Required {"   "}
      </label></Checkbox>
  </Button>
)
}










 
//   return (
//     <div className="flex items-center justify-between hover:bg-zinc-100 rounded-lg px-1 py-1">
//     <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
//       Required {"   "}
//     </label>
//     <button
//       onClick={() => {
//         toggleRequired(isRequired!);
//         setIsRequired(!isRequired);
//       }}
//       type="button"
//       role="switch"
//       aria-checked={isRequired}
//       data-state={isRequired ? "checked" : "unchecked"}
//       value="on"
//       className="peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800 h-5 w-10"
//       id="required"
//     >
//       <span
//         data-state={isRequired ? "checked" : "unchecked"}
//         className="pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-zinc-950 h-4 w-4"
//       ></span>
//     </button>
//   </div>
 