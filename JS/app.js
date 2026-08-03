// Captura dos elementos de controle (Sliders)
const sliderMaxWidth = document.getElementById('slider-max-width');
const sliderPadding = document.getElementById('slider-padding');

// Captura das tags de texto que exibem os valores reais
const valMaxWidth = document.getElementById('val-max-width');
const valPadding = document.getElementById('val-padding');

// Captura dos elementos do layout que sofrerão a alteração
const previewHeader = document.getElementById('preview-header');
const previewCard = document.getElementById('preview-card');
const btnInspecao = document.getElementById('btn-borda-inspecao');

// Função para atualizar a largura máxima (max-width)
sliderMaxWidth.addEventListener('input', (e) => {
    const valor = e.target.value;
    valMaxWidth.textContent = `${valor}px`;
    
    // Aplica o valor dinamicamente nos dois blocos
    previewHeader.style.maxWidth = `${valor}px`;
    previewCard.style.maxWidth = `${valor}px`;
    
    // Centralização automática via JS caso necessário reafirmar a margem
    previewHeader.style.margin = "0 auto";
    previewCard.style.margin = "0 auto";
});

// Função para atualizar o espaçamento interno (padding)
sliderPadding.addEventListener('input', (e) => {
    const valor = e.target.value;
    valPadding.textContent = `${valor}px`;
    
    // Aplica o padding dinamicamente
    previewHeader.style.padding = `${valor}px`;
    previewCard.style.padding = `${valor}px`;
});

// Alternador da Borda de Inspeção (Vermelha 5px)
btnInspecao.addEventListener('click', () => {
    previewHeader.classList.toggle('modo-inspecao');
    previewCard.classList.toggle('modo-inspecao');
    
    // Muda o texto do botão para indicar o estado atual
    if (previewHeader.classList.contains('modo-inspecao')) {
        btnInspecao.textContent = "Ocultar Borda de Inspeção";
        btnInspecao.style.backgroundColor = "#4a5568"; // Cor neutra quando ativo
    } else {
        btnInspecao.textContent = "Ativar Borda de Inspeção (5px)";
        btnInspecao.style.backgroundColor = "#e53e3e"; // Vermelho original
    }
});