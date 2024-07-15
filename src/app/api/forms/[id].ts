import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextApiRequest, res: NextApiResponse ) {
  try {
    const supabase = createClient();
    
    const {  id } = req.query
      const { data: forms, error } = await supabase
      .from("form")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ forms });

  } catch (error) {
    console.error("Error fetching forms:", error);
     throw error;
  }
}
