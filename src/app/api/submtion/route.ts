import { createClient } from "@/utils/supabase/server"; 
import { NextRequest, NextResponse } from "next/server";
  
export async function  POST(req:NextRequest )  {
    const supabase = createClient(); 
    const {  content,formId  } = await req.json();
     
    try {
      const { data, error } = await supabase
      .from('submition')
      .insert([
        {   content,formId }
      ]);
      console.log(data)
      if (error) throw error;
      return NextResponse.json({ "data": data })
      
      } catch (error) {
        return NextResponse.json({ "error": error })
        
      }
      
    }
    