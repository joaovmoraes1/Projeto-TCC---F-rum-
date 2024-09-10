// Seleciona os elementos necessários
const navLinks = document.querySelectorAll('.nav-item');
const pageContent = document.getElementById('main-content-inner');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const closeButtons = document.querySelectorAll('.modal .close');

// Dados de exemplo (substitua pelos dados reais)
const topics = [
    {
        id: 1,
        title: "Como começar a programar em Python?",
        content: "Olá, estou começando a estudar programação e gostaria de aprender Python. Alguém pode me ajudar com dicas?",
        author: "João Silva",
        date: "2023-10-26",
        category: "logica",
        tags: ["python", "programação", "iniciante"],
        replies: 2
    },
    // ... adicione mais tópicos conforme necessário
];

const replies = [
    // ...
];

const users = [
    // ...
];

// Templates HTML para cada seção
const homeContent = `
    <section id="home" class="page active">
        <h1>Bem-vindo ao Fórum CoopQuest</h1>
        <div class="content">
            <div class="left-column">
                <section class="card topics">
                    <h2>Tópicos Recentes</h2>
                    <ul id="recent-topics"></ul>
                    <button id="load-more">Carregar Mais</button>
                </section>
                
                <section class="card new-topic">
                    <h2>Criar Novo Tópico</h2>
                    <form id="new-topic-form">
                        <input type="text" id="topic-title" placeholder="Título do Tópico" required>
                        <textarea id="topic-content" placeholder="Conteúdo do Tópico" required></textarea>
                        <select id="topic-category" required>
                            <option value="">Selecione uma categoria</option>
                            <option value="logica">Lógica de Programação</option>
                            <option value="jogos">Jogos Cooperativos</option>
                            <option value="geral">Discussão Geral</option>
                        </select>
                        <input type="text" id="topic-tags" placeholder="Tags (separadas por vírgula)">
                        <button type="submit">Criar Tópico</button>
                    </form>
                </section>
            </div>
            
            <div class="right-column">
                <section class="card stats">
                    <h2>Estatísticas do Fórum</h2>
                    <p>Tópicos: <span id="topic-count">0</span></p>
                    <p>Respostas: <span id="reply-count">0</span></p>
                    <p>Membros: <span id="member-count">0</span></p>
                </section>
                
                <section class="card online-members">
                    <h2>Membros Online</h2>
                    <ul id="online-members-list"></ul>
                </section>
                
                <section class="card challenge">
                    <h2>Desafio do Dia</h2>
                    <p id="daily-challenge">Carregando desafio...</p>
                    <button id="participate-challenge">Participar</button>
                </section>
            </div>
        </div>
    </section>
`;

const gamesContent = `
    <section id="games" class="page active">
        <h1>Jogos Cooperativos</h1>
        <div class="game-list">
            <div class="game-item">
                <img src="game1.jpg" alt="Jogo 1">
                <h3>Coders Unite</h3>
                <p>Um jogo de programação cooperativa para aprender lógica juntos.</p>
                <button>Jogar Agora</button>
            </div>
            <div class="game-item">
                <img src="game2.jpg" alt="Jogo 2">
                <h3>Debug Masters</h3>
                <p>Encontre e corrija bugs em equipe neste desafiante jogo de programação.</p>
                <button>Jogar Agora</button>
            </div>
            <!-- Adicione mais jogos conforme necessário -->
        </div>
    </section>
`;

const communityContent = `
    <section id="community" class="page active">
        <h1>Comunidade CoopQuest</h1>
        <div class="community-content">
            <section class="card">
                <h2>Grupos de Estudo</h2>
                <ul>
                    <li>Lógica de Programação Básica</li>
                    <li>Estruturas de Dados Avançadas</li>
                    <li>Desenvolvimento de Jogos Cooperativos</li>
                </ul>
            </section>
            <section class="card">
                <h2>Eventos</h2>
                <ul>
                    <li>Hackathon CoopQuest - 15 de Outubro</li>
                    <li>Workshop de Game Design - 22 de Outubro</li>
                    <li>Palestra: O Futuro dos Jogos Educativos - 5 de Novembro</li>
                </ul>
            </section>
        </div>
    </section>
`;

const helpContent = `
    <section id="help" class="page active">
        <h1>Central de Ajuda</h1>
        <div class="help-content">
            <section class="card">
                <h2>Perguntas Frequentes</h2>
                <ul>
                    <li>Como criar uma conta?</li>
                    <li>Como participar dos desafios diários?</li>
                    <li>Como ganhar pontos e subir de nível?</li>
                </ul>
            </section>
            <section class="card">
                <h2>Contato</h2>
                <p>Não encontrou o que procurava? Entre em contato conosco:</p>
                <p>Email: suporte@coopquest.com</p>
                <p>Telefone: (91) 1234-5678</p>
            </section>
        </div>
    </section>
`;

// Função para mostrar uma página específica
function showPage(pageName) {
    pageContent.innerHTML = ''; // Limpa o conteúdo da main

    // Defina o conteúdo da página 
    let content = '';
    switch (pageName) {
        case 'home':
            content = homeContent;
            break;
        case 'games':
            content = gamesContent;
            break;
        case 'community':
            content = communityContent;
            break;
        case 'help':
            content = helpContent;
            break;
    }
    pageContent.innerHTML = content;

    // Chama as funções para atualizar o conteúdo dinâmico
    if (pageName === 'home') {
        displayRecentTopics();
        updateStats();
        displayOnlineMembers();
        setDailyChallenge();
    }
}

// Eventos para os links da navegação
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        const targetPage = this.getAttribute('data-page');
        showPage(targetPage);
    });
});

// Carrega a página inicial ao carregar o documento
window.addEventListener('load', () => {
    showPage('home');
});

// Carregar tópicos recentes
function displayRecentTopics() {
    const recentTopicsContainer = document.getElementById('recent-topics');
    recentTopicsContainer.innerHTML = ''; // Limpar tópicos anteriores

    topics.slice(-5).reverse().forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.innerHTML = `
            <h4>${topic.title}</h4>
            <p>${topic.content}</p>
            <span>Autor: ${topic.author}</span> | <span>Data: ${topic.date}</span> | <span>Respostas: ${topic.replies}</span>
        `;
        recentTopicsContainer.appendChild(topicItem);
    });
}

// Exibir membros online (lógica de exemplo)
function displayOnlineMembers() {
    const onlineMembersContainer = document.getElementById('online-members-list');
    onlineMembersContainer.innerHTML = ''; // Limpar membros anteriores

    const onlineMembers = users.filter(user => user.userType === "student"); // Ajuste conforme necessário

    onlineMembers.forEach(member => {
        const memberItem = document.createElement('li');
        memberItem.className = 'member-item';
        memberItem.innerHTML = `<span>${member.name}</span>`;
        onlineMembersContainer.appendChild(memberItem);
    });
}

// Configurar o desafio diário
function setDailyChallenge() {
    const challengeContainer = document.getElementById('daily-challenge');
    const today = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    const challenge = {
        title: "Desafio de Algoritmos",
        description: "Resolva o desafio de ordenação de um array usando o algoritmo de sua escolha.",
        date: today
    };

    challengeContainer.innerHTML = `
        <h4>${challenge.title}</h4>
        <p>${challenge.description}</p>
        <button id="participate-challenge">Participar</button>
    `;

    document.getElementById('participate-challenge').addEventListener('click', () => {
        alert('Obrigado por participar do desafio!');
    });
}

// Atualiza estatísticas do fórum
function updateStats() {
    document.getElementById('topic-count').textContent = topics.length;
    document.getElementById('reply-count').textContent = replies.length;
    document.getElementById('member-count').textContent = users.length;
}

// Modal de Login
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Fechar modais
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Fechar modais ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === loginModal || event.target === registerModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});
