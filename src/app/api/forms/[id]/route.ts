import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try { 
    const supabase = createClient();
    const formId = req.url.split("/api/forms/").pop();
     
    const { data: form, error } = await supabase
      .from("form")
      .select("*")
      .eq("id", formId)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ form });
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
  const supabase = createClient();
  const id = req.url.split("/api/forms/").pop();
       
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
    const formId = req.url.split("/api/forms/").pop();

    const { user_id, ...updates } = await req.json();

    console.log("Form ID:", formId);
    console.log("User ID:", user_id);

    const { data: forms, error } = await supabase
      .from('form')
      .update(updates)
      .eq('id', formId)
      .eq('user_id', user_id)
      .select('*') // Remove .single() for better debugging
      .maybeSingle(); // Use maybeSingle() to avoid throwing an error if no rows match

    if (error) {
      console.error("Error from Supabase:", error);
      return NextResponse.json({ error: 'Failed to update form' }, { status: 400 });
    }

    if (!forms) {
      console.warn("No matching form found for update");
      return NextResponse.json({ error: 'No matching form found' }, { status: 404 });
    }

    return NextResponse.json({ forms });
  } catch (error) {
    console.error("Error updating forms:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

