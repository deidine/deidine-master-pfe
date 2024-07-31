import { createClient } from "@/utils/supabase/server";
export default async function  signout () {
     const   supabase = createClient();
     const { error } = await supabase.auth.signOut()
     if (error) {console.error('Logout failed:', error);}
     else {console.log('Logout successful');}
}