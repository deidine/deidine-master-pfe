import { NextRequest, NextResponse } from 'next/server';
export async function POST(req:NextRequest ) {
  
        try {
            const data = req.body;
            console.log('Webhook payload:', data);

            // Process the webhook payload
      return NextResponse.json({ 'Webhook received!': data })
 
        } catch (error) {
            console.error('Error handling webhook:', error);
      return NextResponse.json({ 'erroe!': error })
           
        }
    }  
