
        document.addEventListener("DOMContentLoaded", function() {
            
            // 1. Interação com o Formulário de Contato
            const form = document.querySelector("form");
            form.addEventListener("submit", function(event) {
                event.preventDefault(); // Impede o envio real para fins de demonstração
                
                const nome = document.getElementById("nomeContato").value;
                alert(`Obrigado pelo contato, ${nome}! Sua mensagem foi simulada com sucesso e em breve entraremos em contato.`);
                form.reset(); // Limpa o formulário
            });

            // 2. Botão para Alterar Estilo / Tema da Página dinamicamente
            // Vamos criar um botão interativo e injetá-lo na barra de navegação (.destaque)
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
                    alert("Tema claro ativado!");
                } else {
                    document.body.style.backgroundColor = "#0b0b0b";
                    document.body.style.color = "#f8fafc";
                    alert("Tema escuro restaurado!");
                }
            });

            // 3. Interação com o Usuário (Mensagem personalizada no cabeçalho)
            const headerP = document.querySelector("header p");
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

            // Cria um elemento dinâmico com a saudação
            const divSaudacao = document.createElement("p");
            divSaudacao.innerHTML = `<strong>Visita:</strong> ${saudacao} Seja muito bem-vindo(a) ao meu portfólio!`;
            divSaudacao.style.color = "#38bdf8";
            document.querySelector("header").appendChild(divSaudacao);
        });
