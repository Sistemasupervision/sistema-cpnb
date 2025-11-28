// assets/js/main.js

async function verificarYMostrarBotonAdmin() {
    const adminBtn = document.getElementById('adminUsuariosBtn');
    if (!adminBtn) return;
    try {
        const { data } = await supabase.auth.getUser();
        if (!data?.user) {
            adminBtn.style.display = 'none';
            return;
        }
        const { data: roles, error } = await supabase
            .from('usuarios_roles')
            .select('rol')
            .eq('user_id', data.user.id);
        if (error) throw error;
        const esAdmin = roles.some(r => r.rol === 'admin');
        adminBtn.style.display = esAdmin ? 'block' : 'none';
        if (esAdmin) {
            adminBtn.onclick = () => window.location.href = 'admin-usuarios.html';
        }
    } catch (err) {
        console.error('Error al verificar rol de admin:', err);
        adminBtn.style.display = 'none';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.getElementById('userNameDisplay').textContent = email;
        await verificarYMostrarBotonAdmin();
    } catch (error) {
        showError('Credenciales incorrectas o usuario no existe');
    }
}

async function handleLogout() {
    await supabase.auth.signOut();
    document.getElementById('dashboardContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loginForm').reset();
    document.getElementById('adminUsuariosBtn').style.display = 'none';
}

function irARedip(nombreRedip) {
    alert(`Próximamente: ${nombreRedip.toUpperCase()}`);
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
}

async function checkAuth() {
    try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dashboardContainer').style.display = 'block';
            document.getElementById('userNameDisplay').textContent = data.user.email;
            await verificarYMostrarBotonAdmin();
        } else {
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('dashboardContainer').style.display = 'none';
        }
    } catch (err) {
        console.error('Error al verificar sesión:', err);
        document.getElementById('loginContainer').style.display = 'block';
        document.getElementById('dashboardContainer').style.display = 'none';
    }
}

// Configurar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    checkAuth();
});
