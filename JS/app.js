/* =========================================
   PROTOFEEDBACK
   Sistema de análise de protótipos
========================================= */


/* =========================================
   VARIÁVEIS
========================================= */

let feedbacks = [];

let aprovados = 0;
let rejeitados = 0;


/* =========================================
   NAVEGAÇÃO
========================================= */

function irParaPerguntas() {

    const secao = document.getElementById("perguntas");

    if (secao) {
        secao.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================
   MODAL
========================================= */

function mostrarSobre() {

    const modal = document.getElementById("aboutModal");

    modal.classList.add("show");
}


function fecharSobre() {

    const modal = document.getElementById("aboutModal");

    modal.classList.remove("show");
}


/* Fecha o modal clicando fora */

document.getElementById("aboutModal").addEventListener("click", function(event) {

    if (event.target === this) {
        fecharSobre();
    }

});


/* =========================================
   PERGUNTAS
========================================= */

function atualizarPerguntas() {

    const respostas = document.querySelectorAll(".answer");

    let respondidas = 0;

    respostas.forEach(function(resposta) {

        if (resposta.value.trim().length > 0) {
            respondidas++;
        }

    });

    const contador = document.getElementById("questionCounter");

    contador.textContent = respondidas;


    /*
        Atualiza o progresso geral.
        As 5 perguntas representam uma parte
        do processo.
    */

    atualizarProgresso(respondidas);


    respostas.forEach(function(resposta) {

        if (resposta.value.trim().length > 0) {

            resposta.style.borderColor = "#6c4df6";

        } else {

            resposta.style.borderColor = "";

        }

    });

}


/* =========================================
   PROGRESSO
========================================= */

function atualizarProgresso(perguntasRespondidas) {

    let porcentagem = 0;

    /*
        Perguntas = 20%
        Feedback = 20%
        Decisões = 20%
        Link = 20%
        Início = 20%
    */

    if (perguntasRespondidas > 0) {
        porcentagem += (perguntasRespondidas / 5) * 20;
    }

    if (feedbacks.length > 0) {
        porcentagem += 20;
    }

    if (aprovados + rejeitados > 0) {
        porcentagem += 20;
    }

    const link = document.getElementById("figmaLink");

    if (link && link.value.trim() !== "") {
        porcentagem += 20;
    }

    if (porcentagem >= 80) {
        porcentagem += 20;
    }

    porcentagem = Math.min(100, Math.round(porcentagem));


    document.getElementById("progressFill").style.width =
        porcentagem + "%";

    document.getElementById("progressText").textContent =
        porcentagem + "% concluído";


    atualizarEtapas(porcentagem);
}


/* =========================================
   ETAPAS
========================================= */

function atualizarEtapas(porcentagem) {

    const etapas = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
        document.getElementById("step4"),
        document.getElementById("step5")
    ];

    etapas.forEach(function(etapa) {

        etapa.classList.remove("active");

    });


    if (porcentagem >= 0) {
        etapas[0].classList.add("active");
    }

    if (porcentagem >= 20) {
        etapas[1].classList.add("active");
    }

    if (porcentagem >= 40) {
        etapas[2].classList.add("active");
    }

    if (porcentagem >= 60) {
        etapas[3].classList.add("active");
    }

    if (porcentagem >= 80) {
        etapas[4].classList.add("active");
    }
}


/* =========================================
   ADICIONAR FEEDBACK
========================================= */

function adicionarFeedback() {

    const campo = document.getElementById("feedbackText");

    const texto = campo.value.trim();


    if (texto === "") {

        alert("Digite um feedback antes de adicionar.");

        campo.focus();

        return;
    }


    const feedback = {

        id: Date.now(),

        texto: texto,

        status: "pendente"

    };


    feedbacks.push(feedback);


    campo.value = "";


    renderizarFeedbacks();

    atualizarProgresso(
        document.querySelectorAll(".answer").length
    );
}


/* =========================================
   MOSTRAR FEEDBACKS
========================================= */

function renderizarFeedbacks() {

    const lista = document.getElementById("feedbackList");


    if (feedbacks.length === 0) {

        lista.innerHTML = `

            <div class="empty-feedback">

                <div>💬</div>

                <h3>
                    Nenhum feedback ainda
                </h3>

                <p>
                    Os feedbacks adicionados aparecerão aqui.
                </p>

            </div>

        `;

        return;
    }


    lista.innerHTML = "";


    feedbacks.forEach(function(feedback) {

        const item = document.createElement("div");

        item.className = "feedback-item";


        let statusHTML = "";


        if (feedback.status === "aprovado") {

            statusHTML = `
                <small style="color:#20a66a;font-weight:700;">
                    ✓ Feedback aprovado
                </small>
            `;

        } else if (feedback.status === "rejeitado") {

            statusHTML = `
                <small style="color:#e34f5f;font-weight:700;">
                    × Feedback não aplicado
                </small>
            `;

        } else {

            statusHTML = `

                <div class="feedback-actions">

                    <button
                        class="approve"
                        onclick="aprovarFeedback(${feedback.id})">

                        ✓ Aplicar

                    </button>

                    <button
                        class="reject"
                        onclick="rejeitarFeedback(${feedback.id})">

                        × Não aplicar

                    </button>

                </div>

            `;
        }


        item.innerHTML = `

            <p>
                ${escaparHTML(feedback.texto)}
            </p>

            ${statusHTML}

        `;


        lista.appendChild(item);

    });


    atualizarContadores();
}


/* =========================================
   APROVAR FEEDBACK
========================================= */

function aprovarFeedback(id) {

    const feedback = feedbacks.find(function(item) {

        return item.id === id;

    });


    if (!feedback || feedback.status !== "pendente") {
        return;
    }


    feedback.status = "aprovado";

    aprovados++;

    renderizarFeedbacks();

    atualizarContadores();

    atualizarProgresso(
        document.querySelectorAll(".answer").length
    );
}


/* =========================================
   REJEITAR FEEDBACK
========================================= */

function rejeitarFeedback(id) {

    const feedback = feedbacks.find(function(item) {

        return item.id === id;

    });


    if (!feedback || feedback.status !== "pendente") {
        return;
    }


    feedback.status = "rejeitado";

    rejeitados++;

    renderizarFeedbacks();

    atualizarContadores();

    atualizarProgresso(
        document.querySelectorAll(".answer").length
    );
}


/* =========================================
   CONTADORES
========================================= */

function atualizarContadores() {

    document.getElementById("approvedCount").textContent =
        aprovados;

    document.getElementById("rejectedCount").textContent =
        rejeitados;


    const mensagem =
        document.getElementById("decisionMessage");


    if (aprovados === 0 && rejeitados === 0) {

        mensagem.textContent =
            "Adicione feedbacks acima para começar a tomar decisões.";

        return;
    }


    if (aprovados > rejeitados) {

        mensagem.textContent =
            "A maioria dos feedbacks está sendo incorporada ao projeto. Ótimo trabalho!";

    } else if (rejeitados > aprovados) {

        mensagem.textContent =
            "Você está filtrando os feedbacks para manter o foco na proposta principal.";

    } else {

        mensagem.textContent =
            "Você está equilibrando as sugestões recebidas. Continue analisando o projeto.";

    }
}


/* =========================================
   SALVAR LINK DO FIGMA
========================================= */

function salvarLink() {

    const campo =
        document.getElementById("figmaLink");

    const mensagem =
        document.getElementById("savedMessage");

    const link =
        campo.value.trim();


    if (link === "") {

        mensagem.style.color = "#e34f5f";

        mensagem.textContent =
            "Cole o link do seu projeto no Figma.";

        campo.focus();

        return;
    }


    /*
        Validação simples de URL
    */

    try {

        const url = new URL(link);

        if (!url.protocol.startsWith("http")) {

            throw new Error();

        }

    } catch {

        mensagem.style.color = "#e34f5f";

        mensagem.textContent =
            "Digite um link válido.";

        return;
    }


    mensagem.style.color = "#20a66a";

    mensagem.textContent =
        "✓ Link salvo! Sua entrega está pronta para ser enviada.";


    atualizarProgresso(
        document.querySelectorAll(".answer").length
    );
}


/* =========================================
   PROTEÇÃO CONTRA HTML
========================================= */

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


/* =========================================
   ATUALIZAÇÃO DO LINK
========================================= */

document.getElementById("figmaLink").addEventListener(
    "input",
    function() {

        atualizarProgresso(
            document.querySelectorAll(".answer").length
        );

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    atualizarPerguntas();

    atualizarContadores();

});