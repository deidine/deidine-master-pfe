import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
 
export async function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const session = await updateSession(request);
  if (!session) {
    // If the user is not authenticated, redirect them to the login page or display an error message
    return NextResponse.redirect("/login");
  } 
  // If the user is authenticated, allow them to access the form page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};