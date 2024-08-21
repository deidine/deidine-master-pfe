"use client"
import { GoogleAnalytics ,sendGAEvent} from '@next/third-parties/google'
 
export default function Page() {

  return <>
  <button onClick={() =>{
    sendGAEvent({
      event: 'button clicked',value:"deidine"})
  }}>
     click
  </button>
<GoogleAnalytics gaId="G-1N59NG1HZD" />  </>
}