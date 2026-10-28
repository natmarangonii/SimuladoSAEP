const API = 'http://localhost:3000';
const currentUser = () => { try { return JSON.parse(localStorage.getItem('discostudio_user') || 'null'); } catch { return null; } };
function requireLogin(){const u=currentUser(); if(!u){location.href='../index.html';return null;} document.querySelectorAll('[data-user-name]').forEach(el=>el.textContent=u.nome||u.email);return u;}
function logout(){localStorage.removeItem('discostudio_user');location.href='../index.html';}
async function api(path,options={}){let res;try{res=await fetch(API+path,{...options,headers:{'Content-Type':'application/json',...(options.headers||{})}});}catch(e){throw new Error('Não consegui conectar ao backend. Confira se o servidor está rodando na porta 3000.');}const text=await res.text();let data;try{data=text?JSON.parse(text):null;}catch{data=text;}if(!res.ok)throw new Error(data?.message||data?.error||`Erro ${res.status} ao acessar o servidor.`);return data;}
function money(v){return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}function dateToday(){const d=new Date();const year=d.getFullYear();const month=String(d.getMonth()+1).padStart(2,'0');const day=String(d.getDate()).padStart(2,'0');return `${year}-${month}-${day}`;}
function showNotice(el,msg,type='error'){if(!el)return;el.textContent=msg;el.className=`notice show ${type}`;}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}


// Login e cadastro de usuário usando as rotas existentes no backend.
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    if (showRegister && showLogin && loginForm && registerForm) {
        showRegister.addEventListener('click', () => {
            loginForm.hidden = true;
            registerForm.hidden = false;
            document.getElementById('registerNome').focus();
        });
        showLogin.addEventListener('click', () => {
            registerForm.hidden = true;
            loginForm.hidden = false;
            document.getElementById('email').focus();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const notice = document.getElementById('loginNotice');
            const email = document.getElementById('email').value.trim().toLowerCase();
            const senha = document.getElementById('senha').value;

            try {
                showNotice(notice, 'Verificando acesso…', 'success');
                const users = await api('/usuario/listar');
                const user = (Array.isArray(users) ? users : []).find((item) =>
                    String(item.email).toLowerCase() === email && item.senha === senha
                );

                if (!user) throw new Error('E-mail ou senha não conferem.');

                localStorage.setItem('discostudio_user', JSON.stringify({
                    id_usuario: user.id_usuario,
                    nome: user.nome,
                    email: user.email
                }));
                window.location.href = 'pages/home.html';
            } catch (error) {
                showNotice(notice, error.message, 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const notice = document.getElementById('registerNotice');
            const nome = document.getElementById('registerNome').value.trim();
            const email = document.getElementById('registerEmail').value.trim().toLowerCase();
            const senha = document.getElementById('registerSenha').value;
            const confirmacao = document.getElementById('confirmSenha').value;

            if (nome.length < 2) {
                showNotice(notice, 'Informe seu nome completo.', 'error');
                return;
            }
            if (senha.length < 6) {
                showNotice(notice, 'A senha precisa ter pelo menos 6 caracteres.', 'error');
                return;
            }
            if (senha !== confirmacao) {
                showNotice(notice, 'As senhas não são iguais.', 'error');
                return;
            }

            try {
                showNotice(notice, 'Criando sua conta…', 'success');
                const user = await api('/usuario/cadastrar', {
                    method: 'POST',
                    body: JSON.stringify({ nome, email, senha })
                });
                showNotice(notice, 'Conta criada! Você já pode entrar.', 'success');
                registerForm.reset();
                registerForm.hidden = true;
                loginForm.hidden = false;
                document.getElementById('email').value = email;
                document.getElementById('senha').value = '';
                showNotice(document.getElementById('loginNotice'), 'Cadastro concluído. Entre com seu e-mail e senha.', 'success');
                document.getElementById('senha').focus();
            } catch (error) {
                const message = /unique|constraint|email/i.test(error.message)
                    ? 'Esse e-mail já está cadastrado. Tente entrar ou use outro e-mail.'
                    : error.message;
                showNotice(notice, message, 'error');
            }
        });
    }
});
