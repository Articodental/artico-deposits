import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dbqjkjtrphjqfbxuxama.supabase.co'
const supabaseKey = 'sb_publishable_Y7iBKl6D50iTleXfge8y9g_uRRxpQN5'
export const supabase = createClient(supabaseUrl, supabaseKey)
