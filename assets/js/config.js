// assets/js/config.js
const supabaseUrl = 'https://ksczzvtgncvxfrmtvmll.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzY3p6dnRnbmN2eGZybXR2bWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NjMyMzcsImV4cCI6MjA3NDMzOTIzN30.AuWa3uaRylpXhz_VUh097k5tgNHuDllN8j-Hrktwzno';

// ✅ Usa el cliente global ya disponible
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
