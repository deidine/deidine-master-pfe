// /pages/api/insertPost.js

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

 
export async function  POST(req:NextRequest ) {
  
    const { title, content, description } = await req.json();
    const supabase = createClient();
 
    try {
      const { data, error } = await supabase
        .from('form')
        .insert([
          { title, content, description }
        ]);

      if (error) throw error;
      return NextResponse.json({ "data": data })

    } catch (error) {
      return NextResponse.json({ "error": error })
 
    }
 
}
  // const handleSave = async () => {
 
  //   const supabase = createClient();

  //   try {
  //     const { data, error } = await supabase
  //       .from('form') 
  //       .insert([
  //         {
  //           title: form.title,
  //           content: elements,
  //           description: form.description,
  //         },
  //       ]);

  //     if (error) {
  //       console.error('Error inserting data:', error);
  //     } else {
  //       console.log('Data inserted:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };