// /pages/api/insertPost.js

import { createClient } from "@/utils/supabase/server";
import { createClientBrowser } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";


export async function  POST(req:NextRequest ) {
  const supabase = createClient();
  
  const { title, content, style,description,user_id } = await req.json();
  
  try {
    const { data, error } = await supabase
    .from('form')
    .insert([
      { title, content, style,description,user_id }
    ]);
    
    if (error) throw error;
    return NextResponse.json({ "data": data })
    
    } catch (error) {
      return NextResponse.json({ "error": error })
      
    }
    
  }
  
  
  
  export async function GET(req:NextRequest) {
  const supabaseclient = createClientBrowser();
  try {
  
    const user_id = req.nextUrl.searchParams.get('user_id'); 
    const { data: forms, error } = await supabaseclient
      .from('form')
      .select('*')
      .eq('user_id', user_id) 
      .order("created_at", { ascending: false })

      ;

    if (error) {
      throw error;
    }
console.log(forms)
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
 