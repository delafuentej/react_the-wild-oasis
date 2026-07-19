import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://efcpxsqaprxmncnkqmyc.supabase.co";
const supabaseKey = "sb_publishable_Aq_Bkp-LIlU-I5zO7p0O2A_vek6MHYu"; //process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
