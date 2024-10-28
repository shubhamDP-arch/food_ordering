import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://khttflgqgxjmirpqralo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtodHRmbGdxZ3hqbWlycHFyYWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3ODk3ODQsImV4cCI6MjA0NTM2NTc4NH0.Sln1Vaf-IRw4B6pD96iS4mm6NrJmv-YvuE8tSU9rHBI'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})