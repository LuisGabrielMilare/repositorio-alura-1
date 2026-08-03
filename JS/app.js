// Captura o botão de alternância de tema
const btnTema = document.getElementById('toggle-tema');
const txtBtn = btnTema.querySelector('.txt-btn');

// Adiciona o evento de clique
btnTema.addEventListener('click', () => {
    // Alterna a classe '.tema-escuro' no body da página
    document.body.classList.toggle('tema-escuro');
    
    // Verifica se o modo escuro está ativo para atualizar o texto do botão
    if (document.body.classList.contains('tema-escuro')) {
        btnTema.innerHTML = "☀️ <span class='txt-btn'>Modo Claro</span>";
    } else {
        btnTema.innerHTML = "🌙 <span class='txt-btn'>Modo Escuro</span>";
    }
});