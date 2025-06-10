import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";


export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(supabaseUrl, supabaseAnonKey, {
            async accessToken() {
                return (await auth()).getToken();
            }
    });
}