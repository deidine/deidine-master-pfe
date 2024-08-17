import React from 'react'

export default function Content() {
  return (
    <section className='py-14 px-16 my-7 w-full' id='documentation'>
      <p className='text-center font-bold text-2xl my-2 text-blue-800'>Features Overview</p>
      <div className='w-[80%] mx-auto md:flex justify-center rounded-2xl'>
        <div className='border-2 border-slate-500 mx-2 basis-1/3 text-center py-12 my-3 bg-white drop-shadow-lg'>
          <h1 className='text-5xl font-bold text-blue-800 py-2'>Drag & Drop</h1>
          <p className='text-2xl font-semibold text-gray-500'>Easily arrange form elements</p>
        </div>
        <div className='border-2 border-slate-500 mx-2 basis-1/3 text-center py-12 my-3 bg-white drop-shadow-lg'>
          <h1 className='text-5xl font-bold text-blue-800 py-2'>Real-Time Preview</h1>
          <p className='text-2xl font-semibold text-gray-500'>See changes instantly</p>
        </div>
        <div className='border-2 border-slate-500 mx-2 basis-1/3 text-center py-12 my-3 bg-white drop-shadow-lg'>
          <h1 className='text-5xl font-bold text-blue-800 py-2'>Export Options</h1>
          <p className='text-2xl font-semibold text-gray-500'>Export forms for React or Flutter</p>
        </div>
      </div>
    </section>
  )
}
