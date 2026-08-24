// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://egfjgesihtkbedssqwtx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZmpnZXNpaHRrYmVkc3Nxd3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MjcwODgsImV4cCI6MjEwMzEwMzA4OH0.iVgSijFSFdECCwvi2Kb1PcyTY3bDJBL8wM5AcOlUBRY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);