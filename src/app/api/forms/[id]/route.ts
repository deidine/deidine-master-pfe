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
