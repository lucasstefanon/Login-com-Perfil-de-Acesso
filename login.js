const ADMIN = { login: 'admin', senha: '123' };
const CHAVE = 'funcionarios';
const SESSAO = 'usuarioLogado';

function login(event) {
  event.preventDefault();

  const loginInput = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro-login');

  erro.textContent = '';

  if (loginInput === ADMIN.login && senha === ADMIN.senha) {
    sessionStorage.setItem(SESSAO, JSON.stringify({ tipo: 'admin' }));
    window.location.href = 'controle.html';
    return;
  }

  const funcionarios = JSON.parse(localStorage.getItem(CHAVE) || '[]');
  const funcionario = funcionarios.find(f => f.email === loginInput && f.senha === senha);

  if (funcionario) {
    sessionStorage.setItem(SESSAO, JSON.stringify({
      tipo: 'funcionario',
      nome: funcionario.nome,
      email: funcionario.email,
      cargo: funcionario.cargo,
      departamento: funcionario.departamento,
    }));
    window.location.href = 'boasvindas.html';
    return;
  }

  erro.textContent = 'Login ou senha inválidos.';
}

document.getElementById('form-login').addEventListener('submit', login);
