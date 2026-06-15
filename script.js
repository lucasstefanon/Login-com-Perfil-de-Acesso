const CHAVE = 'funcionarios';
const SESSAO = 'usuarioLogado';

function verificarAcesso() {
  const dados = JSON.parse(sessionStorage.getItem(SESSAO));

  if (!dados) {
    window.location.href = 'index.html';
    return false;
  }

  if (dados.tipo !== 'admin') {
    window.location.href = 'boasvindas.html';
    return false;
  }

  return true;
}

function sair() {
  sessionStorage.removeItem(SESSAO);
  window.location.href = 'index.html';
}

function carregar() {
  return JSON.parse(localStorage.getItem(CHAVE) || '[]');
}

function salvar(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

function renderizar() {
  const lista = carregar();

  document.getElementById('lista-funcionarios').innerHTML = lista.map(f => `
    <div class="card">
      <p class="card-nome">${f.nome}</p>
      <p class="card-info"><span>E-mail:</span> ${f.email}</p>
      <p class="card-info"><span>Departamento:</span> ${f.departamento}</p>
      <span class="card-cargo">${f.cargo}</span>
    </div>
  `).join('');

  document.getElementById('contador').textContent = `Total: ${lista.length}`;
}

function cadastrar(event) {
  event.preventDefault();

  const lista = carregar();

  lista.push({
    id: lista.length ? Math.max(...lista.map(f => f.id)) + 1 : 1,
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    cargo: document.getElementById('cargo').value.trim(),
    departamento: document.getElementById('departamento').value.trim(),
    senha: document.getElementById('senha').value,
  });

  salvar(lista);
  renderizar();
  event.target.reset();
}

function inicializar() {
  if (!verificarAcesso()) return;

  if (!carregar().length) {
    salvar([
      { id: 1, nome: 'Ana Souza', email: 'ana@email.com', cargo: 'Analista', departamento: 'Financeiro', senha: '123456' },
      { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com', cargo: 'Desenvolvedor', departamento: 'TI', senha: '123456' },
      { id: 3, nome: 'Carla Mendes', email: 'carla@email.com', cargo: 'Gerente', departamento: 'RH', senha: '123456' },
      { id: 4, nome: 'Diego Ferreira', email: 'diego@email.com', cargo: 'Designer', departamento: 'Marketing', senha: '123456' },
      { id: 5, nome: 'Elisa Costa', email: 'elisa@email.com', cargo: 'Coordenadora', departamento: 'Operações', senha: '123456' },
    ]);
  }

  renderizar();
  document.getElementById('form-cadastro').addEventListener('submit', cadastrar);
  document.getElementById('btn-sair').addEventListener('click', sair);
}

inicializar();
