// assets/js/comun.js
const supabase = window.supabase.createClient('...', '...');

async function checkAuthAndRedirect(redipName) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '../index.html'; return false; }
    const { data, error } = await supabase.from('usuarios_redip').select('redip').eq('user_id', user.id).single();
    if (error || !data || (data.redip !== redipName && data.redip !== 'admin')) {
        alert('Acceso denegado');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}
