
    // DOM manipulation: agendamento, scroll e armazenamento local
    const bookingForm = document.getElementById('bookingForm');
    const feedbackDiv = document.getElementById('formFeedback');
    const heroAgendarBtn = document.getElementById('heroAgendarBtn');
    const openWABtn = document.getElementById('openWABtn');

    // Scroll suave até o formulário de agendamento
    function scrollToBooking() {
        const bookingSection = document.getElementById('agendar');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    heroAgendarBtn.addEventListener('click', scrollToBooking);

    // Função para formatar telefone (exibe no console e valida)
    function formatWhatsAppMessage(data) {
        return `Olá Ruck.pet! Gostaria de agendar um horário para meu pet ${data.petName}.\n👤 Tutor: ${data.nome}\n📅 Data: ${data.data} às ${data.horario}\n✂️ Serviço: ${data.servico}\n📞 Meu WhatsApp: ${data.whatsapp}\n\n*Agendamento pelo site - Ruck.pet* 🐾`;
    }

    // Processamento do formulário (validação, localStorage e abertura do WhatsApp)
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();


        const nome = document.getElementById('nome').value.trim();
        const petName = document.getElementById('petName').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const servico = document.getElementById('servico').value;

        if (!nome || !petName || !whatsapp || !data || !horario || !servico) {
            alert("Por favor, preencha todos os campos para realizar o agendamento 💚");
            return;
        }

        // Validação leve de whatsapp (pelo menos 10 dígitos numéricos)
        const phoneDigits = whatsapp.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            if (!confirm("O número de WhatsApp parece incompleto. Deseja continuar mesmo assim?")) {
                return;
            }
        }

        // Objeto do agendamento
        const agendamento = {
            nome,
            petName,
            whatsapp,
            data,
            horario,
            servico,
            timestamp: new Date().toISOString()
        };

        // Armazenar no localStorage 

        let agendamentosSalvos = localStorage.getItem('lume_pet_agendamentos');
        if (agendamentosSalvos) {
            let lista = JSON.parse(agendamentosSalvos);
            lista.push(agendamento);
            localStorage.setItem('Ruck_Pet_agendamentos', JSON.stringify(lista));
        } else {
            localStorage.setItem('Ruck_Pet_agendamentos', JSON.stringify([agendamento]));
        }

        // Exibir mensagem de sucesso estilizada
        feedbackDiv.style.display = "flex";
        feedbackDiv.style.opacity = "1";

        // Limpar os campos do formulário para dar sensação de renovação
        bookingForm.reset();

        // Preparar mensagem personalizada para WhatsApp 
        const mensagemWhatsApp = formatWhatsAppMessage(agendamento);
        
        // Redirecionar para o WhatsApp após 1.2s (aumenta conversão)
        setTimeout(() => {
            const url = `https://wa.me/5547999999999?text=${encodeURIComponent(mensagemWhatsApp)}`;
            window.open(url, '_blank');
        }, 1200);

        // Esconder a mensagem de feedback após 6 segundos
        setTimeout(() => {
            feedbackDiv.style.display = "none";
            feedbackDiv.style.opacity = "0";
        }, 6000);
    });

    // Botão de contato do header (abre WhatsApp direto)
    openWABtn.addEventListener('click', function(e) {
        e.preventDefault();
        const msg = "Olá! Gostaria de saber mais sobre os serviços e agendamentos da Ruck Pet 💚";
        window.open(`https://wa.me/5547999999999?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Animação sutil nos cards ao carregar (efeito de entrada)
    window.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    });
