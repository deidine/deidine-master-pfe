import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
   
  const form_id = req.nextUrl.searchParams.get('form_id');
  
 

  try {
    let query = supabase
      .from('form_submissions')
      .select('*')
      .eq('form_id', form_id)
      .order('created_at', { ascending: false });

    // if (form_id) {
    //   query = query.eq('form_id', form_id);
    // }

    const { data: submissions, error } = await query;

    if (error) throw error;
    return NextResponse.json({ submissions });
    
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  
  const { form_id, submission_data } = await req.json();
  
  try {
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([
        { form_id,  submission_data }
      ]);
    
    if (error) throw error;
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

