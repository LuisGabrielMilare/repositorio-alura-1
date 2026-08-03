// Captura todos os botões de reação da página
const botoesReacao = document.querySelectorAll('.btn-reacao');

// Adiciona o evento de clique para cada um deles de forma isolada
botoesReacao.forEach(botao => {
    botao.addEventListener('click', () => {
        // Encontra a tag <span> que está dentro do botão clicado
        const contadorSpan = botao.querySelector('span');
        
        // Pega o número atual, transforma em inteiro e soma 1
        let contagemAtual = parseInt(contadorSpan.textContent);
        contagemAtual++;
        
        // Atualiza a tela com o novo valor
        contadorSpan.textContent = contagemAtual;
    });
});