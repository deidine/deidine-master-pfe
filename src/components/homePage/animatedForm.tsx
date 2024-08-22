import React from 'react'

export default function AnimatedForm() {
  return (
    <div>
         <div className="w-32 h-32 bg-blue-500 hover:animate-spinAndScale hover:rotate-180 transition-transform duration-500 ease-in-out flex items-center justify-center">
      <span className="text-white">Hover Me</span>
    </div>
    </div>
  )
}
