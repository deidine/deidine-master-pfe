import React from 'react';

export default function Support() {
  return (
    <div className='w-full relative'>
      <div className='bg-slate-300 rounded-lg drop-shadow-lg'>
        <h1 className='sm:text-4xl text-center text-blue-700 font-bold py-3'>Support</h1>
        <p className='text-center md:text-2xl py-2'>Get easy access to our global support team</p>

        <div className='flex justify-center flex-wrap sm:flex-row flex-col'> 

          {/* Technical Support */}
          <div className='py-8 my-8 px-4 mx-4 rounded-lg drop-shadow-2xl basis-1/3 bg-white'>
            <div className='sm:w-14 w-10 text-blue-700'/>
            <h1 className='sm:text-3xl font-bold my-3'>Technical Support</h1>
            <p className='my-3 sm:text-xl'>
              Need help with our Form Builder? Our technical support team is here to assist with any technical issues you may encounter.
            </p>
            <div className='flex items-center my-3'> 
              <h1 className='font-bold'>Contact</h1>
              <div className='w-5 translate-y-0.5 mx-2'/>
            </div>
          </div>

          {/* Customer Service */}
          <div className='py-8 my-8 px-4 mx-4 basis-1/3 rounded-lg drop-shadow-2xl bg-white'>
            <div className='sm:w-14 w-10 text-blue-700'/>
            <h1 className='sm:text-3xl font-bold my-3'>Customer Service</h1>
            <p className='my-3 sm:text-xl'>
              Have questions about pricing, plans, or general inquiries? Our customer service team is here to help.
            </p>
            <div className='flex items-center my-3'> 
              <h1 className='font-bold'>Contact</h1>
              <div className='w-5 translate-y-0.5 mx-2'/>
            </div>
          </div>

          {/* Community Support */}
          <div className='py-8 my-8 px-4 mx-4 basis-1/3 rounded-lg drop-shadow-2xl bg-white'>
            <div className='sm:w-14 w-10 text-blue-700'/>
            <h1 className='sm:text-3xl font-bold my-3'>Community Support</h1>
            <p className='my-3 sm:text-xl'>
              Join our community to share ideas, ask questions, and get help from fellow Form Builder users around the globe.
            </p>
            <div className='flex items-center my-3'> 
              <h1 className='font-bold'>Contact</h1>
              <div className='w-5 translate-y-0.5 mx-2'/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
