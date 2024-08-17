import React from 'react';

export default function Pricing() {
  return (
    <div className='w-full my-8 py-14 px-16'>
        <h1 className='sm:text-4xl text-center text-blue-700 font-bold py-4'>Pricing</h1>
         <h2 className='text-2xl font-semibold my-3 text-center'>Choose Your Plan</h2>

        <div className='flex md:flex-row flex-col flex-wrap justify-between'>

            {/* Free Plan */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>$0/</h1>
                    <p className='my-2 py-2'>Free Plan</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Basic Form Builder</li>
                        <li className='my-2 py-1 font-semibold text-md'>Limited Elements</li>
                        <li className='my-2 py-1 font-semibold text-md'>Local Storage Only</li>
                        <li className='my-2 py-1 font-semibold text-md'>No Export Options</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Get Started</button>
                </div>
            </div>

            {/* Pro Plan */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>$49/</h1>
                    <p className='my-2 py-2'>Pro Plan</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Advanced Form Builder</li>
                        <li className='my-2 py-1 font-semibold text-md'>Unlimited Elements</li>
                        <li className='my-2 py-1 font-semibold text-md'>Local & Cloud Storage</li>
                        <li className='my-2 py-1 font-semibold text-md'>Export to React</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Get Started</button>
                </div>
            </div>

            {/* Enterprise Plan */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>$99/</h1>
                    <p className='my-2 py-2'>Enterprise Plan</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Full Access Form Builder</li>
                        <li className='my-2 py-1 font-semibold text-md'>Custom Form Templates</li>
                        <li className='my-2 py-1 font-semibold text-md'>Local, Cloud & Database Storage</li>
                        <li className='my-2 py-1 font-semibold text-md'>Export to React & Flutter</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Get Started</button>
                </div>
            </div>

        </div>
    </div>
  );
}
