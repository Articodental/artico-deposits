import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dbqjkjtrphjqfbxuxama.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicWpranRycGhqcWZieHV4YW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODQwMDgsImV4cCI6MjA5MzA2MDAwOH0.eBvaM46ciJUSLyzf9d-a1Z7476fxOKnf-1ferrpkesE'
export const supabase = createClient(supabaseUrl, supabaseKey)
