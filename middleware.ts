// import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";
 
// export async function middleware(request: NextRequest) {
//   // Check if the user is authenticated
  
//   const { pathname } = request.nextUrl;
//   if (pathname === "/") {
//     console.log("Redirecting from root to localized path");
//     return NextResponse.redirect(new URL(`/deidne/`, request.url));
//   }

//   const response = await updateSession(request);
//   if (!response) {
//     // If the user is not authenticated, redirect them to the login page
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   // If the user is authenticated, allow them to access the form page
//   return response;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
