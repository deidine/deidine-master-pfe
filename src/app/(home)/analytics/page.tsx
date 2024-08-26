"use client"
import { GoogleAnalytics ,sendGAEvent} from '@next/third-parties/google'
import { useEffect } from 'react';
 
export default function Page() {
    useEffect(() => {
        sendGAEvent({
          event: 'page_view',
          page_path: window.location.pathname,
        });
      }, []);
      const handleSubmit = () => {
        sendGAEvent({ event: 'form_submission', form_id: 'signup_form' });
      };
      
  return <>
  <button className='bg-green-500 rounded-lg border-2 text-red-200 w-[10%] h-6' onClick={() =>{
    sendGAEvent({
      event: 'button_click',value:"deidine"})
  }}>
     click
  </button> 
  <button className='bg-green-500 rounded-lg border-2 text-red-200 w-[10%] h-6' onClick={() => sendGAEvent({ event: 'button_click', label: 'Sign Up' })}>
  Sign Up
</button>
<button className='bg-green-500 rounded-lg border-2 text-red-200 w-[10%] h-6' onClick={handleSubmit}>
submit
</button>
<GoogleAnalytics gaId="G-PZMLGX1KH7" />
   </>
}