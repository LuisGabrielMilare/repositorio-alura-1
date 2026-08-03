// Seleciona os elementos da página
const btnBorda = document.getElementById('btn-borda');
const header = document.getElementById('meu-header');
const main = document.getElementById('meu-main');

// Adiciona a função de clique ao botão
btnBorda.addEventListener('click', () => {
    // O 'toggle' adiciona a classe se ela não existir, e remove se ela já existir
    header.classList.toggle('com-borda');
    main.classList.toggle('com-borda');
});