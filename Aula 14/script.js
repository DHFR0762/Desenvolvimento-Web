document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. FORMULÁRIO COM VALIDAÇÃO, XSS E FEEDBACK
    // ==========================================
    const form = document.querySelector("form");

    // Criação dinâmica de uma caixa de feedback visual (Alerta customizado)
    const feedbackBox = document.createElement("div");
    feedbackBox.style.padding = "12px";
    feedbackBox.style.borderRadius = "8px";
    feedbackBox.style.marginBottom = "15px";
    feedbackBox.style.fontSize = "0.95rem";
    feedbackBox.style.display = "none"; // Oculto inicialmente
    form.prepend(feedbackBox); // Insere no topo do formulário

    // Função auxiliar para escapar caracteres e prevenir XSS
    function escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML; // Transforma tags HTML em texto seguro (ex: &lt;script&gt;)
    }

    // Função para validar o formato do e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para exibir mensagens amigáveis na tela
    function mostrarFeedback(mensagem, tipo) {
        feedbackBox.textContent = mensagem;
        feedbackBox.style.display = "block";
        
        if (tipo === "erro") {
            feedbackBox.style.backgroundColor = "rgba(216, 11, 11, 0.15)";
            feedbackBox.style.color = "#ff6b6b";
            feedbackBox.style.border = "1px solid #d80b0b";
        } else {
            feedbackBox.style.backgroundColor = "rgba(40, 167, 69, 0.15)";
            feedbackBox.style.color = "#51cf66";
            feedbackBox.style.border = "1px solid #28a745";
        }
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio padrão

        // Captura e limpa os espaços em branco extras
        const nomeInput = document.getElementById("nomeContato");
        const emailInput = document.getElementById("emailContato");
        const assuntoInput = document.getElementById("assunto");
        const mensagemInput = document.getElementById("mensagemContato");

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const assunto = assuntoInput.value.trim();
        const mensagem = mensagemInput.value.trim();

        // Validações passo a passo com foco na experiência do usuário
        if (nome.length < 2) {
            mostrarFeedback("Por favor, digite seu nome completo (mínimo de 2 caracteres).", "erro");
            nomeInput.focus();
            return;
        }

        if (!validarEmail(email)) {
            mostrarFeedback("Por favor, insira um endereço de e-mail válido (ex: nome@dominio.com).", "erro");
            emailInput.focus();
            return;
        }

        if (mensagem.length < 10) {
            mostrarFeedback("A sua mensagem é muito curta. Escreva pelo menos 10 caracteres.", "erro");
            mensagemInput.focus();
            return;
        }

        // Proteção XSS: Sanitiza os dados antes de qualquer manipulação ou exibição
        const nomeSeguro = escaparHTML(nome);
        const assuntoSeguro = escaparHTML(assunto);
        const mensagemSegura = escaparHTML(mensagem);

        // Se passar em todas as validações, exibe mensagem de sucesso amigável
        mostrarFeedback(`Obrigado pelo contato, ${nomeSeguro}! Sua mensagem foi enviada com sucesso e retornaremos em breve.`, "sucesso");
        
        form.reset(); // Limpa os campos do formulário
    });

    // ==========================================
    // 2. BOTÃO DE ALTERNAR TEMA (Mantido do anterior)
    // ==========================================
    const nav = document.querySelector(".destaque");
    const btnTema = document.createElement("a");
    btnTema.href = "#";
    btnTema.textContent = "🎨 Alternar Tema";
    btnTema.style.fontWeight = "bold";
    nav.appendChild(btnTema);

    let modoClaro = false;
    btnTema.addEventListener("click", function(e) {
        e.preventDefault();
        modoClaro = !modoClaro;
        
        if (modoClaro) {
            document.body.style.backgroundColor = "#f0f2f5";
            document.body.style.color = "#111111";
        } else {
            document.body.style.backgroundColor = "#0b0b0b";
            document.body.style.color = "#f8fafc";
        }
    });

    // ==========================================
    // 3. SAUDAÇÃO DINÂMICA POR HORÁRIO
    // ==========================================
    const dataAtual = new Date();
    const hora = dataAtual.getHours();
    let saudacao = "Olá!";

    if (hora < 12) {
        saudacao = "Bom dia!";
    } else if (hora < 18) {
        saudacao = "Boa tarde!";
    } else {
        saudacao = "Boa noite!";
    }

    const divSaudacao = document.createElement("p");
    divSaudacao.innerHTML = `<strong>Visita:</strong> ${saudacao} Seja muito bem-vindo(a) ao meu portfólio!`;
    divSaudacao.style.color = "#38bdf8";
    document.querySelector("header").appendChild(divSaudacao);
});
