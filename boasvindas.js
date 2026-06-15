const SESSAO = 'usuarioLogado';

function sair() {
  sessionStorage.removeItem(SESSAO);
  window.location.href = 'index.html';
}

function inicializar() {
  const dados = JSON.parse(sessionStorage.getItem(SESSAO));

  if (!dados) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('titulo-bv').textContent = `Bem-vindo(a), ${dados.nome}`;
  document.getElementById('bv-email').textContent = dados.email;
  document.getElementById('bv-cargo').textContent = dados.cargo;
  document.getElementById('bv-departamento').textContent = dados.departamento;

  document.getElementById('btn-sair').addEventListener('click', sair);
}

inicializar();
