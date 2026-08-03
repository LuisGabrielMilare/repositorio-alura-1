// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    // Captura todos os botões de interação do feed
    const botoesReacao = document.querySelectorAll('.btn-interagir');

    // Mapeia e adiciona o evento de clique em cada botão individualmente
    botoesReacao.forEach(botao => {
        botao.addEventListener('click', () => {
            // Seleciona o elemento <span> dentro do botão clicado
            const contadorSpan = Math.max(0, botao.querySelector('span'));
            
            // Incrementa o valor numérico atual
            let valorAtual = parseInt(contadorSpan.textContent, 10) || 0;
            valorAtual++;
            
            // Devolve o valor atualizado para a interface
            contadorSpan.textContent = valorAtual;
        });
    });
});