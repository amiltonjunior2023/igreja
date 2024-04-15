// Função para exibir uma mensagem de boas-vindas quando o chat é aberto
function exibirMensagemInicial() {
    const mensagemInicial = `Olá! Como posso ajudá-lo hoje 🙂?`;
    addMessage(mensagemInicial, 'bot-message'); // Chama a função addMessage() para exibir a mensagem de boas-vindas
   
}

// Função para alternar a exibição do chat
function toggleChatBox() {
    let chatBox = document.getElementById("chat-box");
    chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
}

// Adiciona um ouvinte de evento para capturar quando a tecla Enter é pressionada
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

userInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        // Verifica se a tecla pressionada é 'Enter' e não está pressionando a tecla Shift ao mesmo tempo
        const userMessage = userInput.value;
        addMessage(userMessage, 'user-message');
        respondToUser(userMessage);
        userInput.value = '';
    }
});


function enviarMensagem() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        addMessage(userInput, 'user-message'); // Adiciona a mensagem do usuário com o ícone
        respondToUser(userInput);
        document.getElementById("user-input").value = ""; // Limpa o campo de entrada após o envio
    }
}


function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    message = message.replace(/\n/g, '<br>'); // Substitui as quebras de linha por <br>

    // Adiciona um ícone correspondente ao tipo de mensagem
    const icon = document.createElement('span');
    icon.classList.add('icon');
    if (type === 'user-message') {
        icon.innerHTML = '<i class="bi bi-person-fill"></i><br>'; // Adiciona o ícone do usuário
    } else if (type === 'bot-message') {
        icon.innerHTML = '<i class="bi bi-robot"></i><br>'; // Adiciona o ícone do robô
    }
    messageDiv.appendChild(icon);

    messageDiv.innerHTML += message; // Adiciona a mensagem depois do ícone
    messageDiv.classList.add('chat-message', type); // Adiciona uma classe para o tipo de mensagem

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Função para responder às mensagens do usuário
function respondToUser(userMessage) {
    // Adiciona uma classe indicando que o bot está digitando
    chatBox.classList.add('bot-is-typing');
    // Reproduz o som de digitação
    document.getElementById('typing-sound').play();

    // Simula um tempo de resposta humano
    const delay = Math.floor(Math.random() * 5000) + 800; // Um atraso aleatório entre 500ms e 2000ms

    setTimeout(() => {
        const botResponses = {
            'informação': `Qual informação deseja? 
                \n            🎼 Cultos 
                \n            📬 Endereço 
                \n            🗓️ Programação da semana
                \n            🥳 Festividades 
                \n            🎉 Eventos
                \n            📔 Lendo a biblia todo dia
                \n            🙏🏼 Periodo de oração
                \n            ▶️ Canal do youtube
                \n            🎥 instagran
                \n            ⛪ Igreja `,
            'cultos': 'Quinta-feira: Culto do propósito \n Horário: 19:30h \n\n Domingo \nCulto de Louvor e adoração\n Horário: 18:00h ',
            'endereço': 'Rua 24 de maio, 20, Vila do Sase-Xerém, Duque de Caxias',
            'programação da semana': 'Segunda e terça \nSeminário Teológico na Sede 19:30h \n\nDomingo \nConsagração 07:00 h\nEscola Bíblica 09:00h',
            'festividades': 'Todo 3º domingo do mês culto de santa ceia e da Semeadura',
            'eventos': 'Ainda não temos algum evento agendado.',
            'lendo a biblia todo dia': 'Todo dia tire um período de leitura e meditação de um capitulo da bíblia',
            'igreja': 'Ministério Shekinah de Xerém  - Congregação de Vila do Sase.',
            'periodo de oração': 'Segunda a sexta feira das. consulte o horario com a irmã da oração',
            'canal do youtube': 'https://www.youtube.com/@shekinahdexerem7641',
            'instagran': 'https://www.instagram.com/mshekinahdosase?igsh=cDdzejVpbzVoeWJr',
        };

        const userMessageCleaned = userMessage.toLowerCase().trim(); // Remove espaços extras e converte para minúsculas

        const botResponse = botResponses[userMessageCleaned] || 'Desculpe, não entendi.';

        if (botResponse.startsWith('http')) {
            // Se a resposta do bot for um link, adicionamos um evento de clique
            const linkElement = document.createElement('a');
            linkElement.href = botResponse;
            linkElement.target = '_blank'; // Para abrir em uma nova aba
            linkElement.textContent = botResponse; // Ou texto personalizado, se preferir
            linkElement.addEventListener('click', function() {
                window.open(botResponse, '_blank');
            });
            addMessage(linkElement.outerHTML, 'bot-message');
        } else {
            addMessage(botResponse, 'bot-message');
        }

        // Remova a classe indicando que o bot está digitando
        chatBox.classList.remove('bot-is-typing');
    }, delay);
}

// Chama a função para exibir a mensagem inicial assim que o script é carregado
exibirMensagemInicial();


document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');

    playButton.addEventListener('click', function() {
        audio.play();
    });

    pauseButton.addEventListener('click', function() {
        audio.pause();
    });
});

