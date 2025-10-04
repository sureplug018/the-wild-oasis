import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qovomjqqgndbhnmzcwhz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdm9tanFxZ25kYmhubXpjd2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTQ4NDcsImV4cCI6MjA3NDgzMDg0N30.ip1wQWgKgft7RJEmxz3X774cbkQFsPF3SveTpdCEUR8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
