// /pages/api/insertPost.js

import { createClient } from "@/utils/supabase/server";
import { createClientBrowser } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";


export async function  POST(req:NextRequest ) {
  const supabase = createClient();
  
  const { title, content, description } = await req.json();
  
  
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
  
  
  
  export async function GET() {
  const supabaseclient = createClientBrowser();
  try {
    

    const { data: forms, error } = await supabaseclient
      .from('form')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json({ forms });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
 

export async function DELETE(req: NextRequest) {
  try {
  const supabase = createClient();
    
    const { id  } = await req.json();

    const { error  } = await supabase
      .from('form')
      .delete()
      .eq('id', id) ;

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting forms:", error);
    return NextResponse.json({ error: 'Internal Server Error'  }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
  const supabase = createClient();
    const { id,   ...updates } = await req.json();

    const { data: forms, error } = await supabase
      .from('form')
      .update(updates)
      .eq('id', id) 
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ forms });
  } catch (error) {
    console.error("Error updating forms:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}







//this for client components
// const handleSave = async () => {
 
  //   

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