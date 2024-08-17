import React from 'react';

export default function Features() {
  return (
    <section id="about" className='w-full my-8 py-14 px-16'>
        <h1 className='sm:text-4xl text-center text-blue-700 font-bold py-4'>Features</h1>
        <h2 className='text-2xl font-semibold my-3 text-center'>Explore Our Capabilities</h2>

        <div className='flex md:flex-row flex-col flex-wrap justify-between'>

            {/* Basic Features */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>Basic</h1>
                    <p className='my-2 py-2'>Essential Tools</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Drag & Drop Form Builder</li>
                        <li className='my-2 py-1 font-semibold text-md'>Customizable Elements</li>
                        <li className='my-2 py-1 font-semibold text-md'>Local Storage Support</li>
                        <li className='my-2 py-1 font-semibold text-md'>Real-time Preview</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Learn More</button>
                </div>
            </div>

            {/* Advanced Features */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>Advanced</h1>
                    <p className='my-2 py-2'>Enhanced Functionality</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Pre-built Form Templates</li>
                        <li className='my-2 py-1 font-semibold text-md'>Custom Validation Rules</li>
                        <li className='my-2 py-1 font-semibold text-md'>Cloud Storage Integration</li>
                        <li className='my-2 py-1 font-semibold text-md'>Export to React Code</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Learn More</button>
                </div>
            </div>

            {/* Enterprise Features */}
            <div className='my-16 border-2 border-blue-500 text-center drop-shadow-2xl rounded-md basis-1/4 py-3'>
                <div>
                    <h1 className='text-4xl text-blue-800 font-bold'>Enterprise</h1>
                    <p className='my-2 py-2'>Complete Solution</p>
                    <ul>
                        <li className='my-2 py-1 font-semibold text-md'>Unlimited Form Elements</li>
                        <li className='my-2 py-1 font-semibold text-md'>Advanced Analytics</li>
                        <li className='my-2 py-1 font-semibold text-md'>Database Connectivity</li>
                        <li className='my-2 py-1 font-semibold text-md'>Export to React & Flutter</li>
                    </ul>
                    <button className='rounded-lg font-semibold bg-blue-700 text-white py-1 px-4'>Learn More</button>
                </div>
            </div>

        </div>
    </section>
  );
}
