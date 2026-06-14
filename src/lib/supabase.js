// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// PERBAIKAN: Bersihkan URL, hilangkan '/rest/v1/' di bagian akhir
const supabaseUrl = 'https://efjpxzxxfvktmzjmytuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmanB4enh4ZnZrdG16am15dHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU4MDEsImV4cCI6MjA5NzAyMTgwMX0.A5JfKgcAqkwTIs3hZl0zVjALyNblPJdo_Wzr7LZpiYY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);