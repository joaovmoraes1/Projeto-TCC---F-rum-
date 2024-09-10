document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching in a real application)
    const topics = [
        { id: 1, title: "Como implementar um algoritmo de busca em profundidade?", replies: 5 },
        { id: 2, title: "Dicas para otimização de código em jogos cooperativos", replies: 8 },
        { id: 3, title: "Implementação de IA em jogos educativos", replies: 3 },
        // Add more topics as needed
    ];

    const onlineMembers = [
        { name: "João Silva", avatar: "user-icon1.png" }, // Usar imagens diferentes para cada usuário
        { name: "Maria Santos", avatar: "user-icon2.png" },
        { name: "Pedro Oliveira", avatar: "user-icon3.png" },
        // Add more members as needed
    ];

    // Function to update forum statistics
    function updateStats() {
        document.getElementById('topic-count').textContent = topics.length;
        document.getElementById('reply-count').textContent = topics.reduce((sum, topic) => sum + topic.replies, 0);
        document.getElementById('member-count').textContent = onlineMembers.length;
    }

    // Function to display recent topics
    function displayRecentTopics() {
        const topicsList = document.getElementById('recent-topics');
        topicsList.innerHTML = '';
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#topic-${topic.id}">${topic.title}</a>
                <span class="badge">${topic.replies}</span>
            `;
            topicsList.appendChild(li);
        });
    }

    // Function to display online members
    function displayOnlineMembers() {
        const membersList = document.getElementById('online-members-list');
        membersList.innerHTML = '';
        onlineMembers.forEach(member => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${member.avatar}" alt="${member.name}">
                ${member.name}
            `;
            membersList.appendChild(li);
        });
    }

    // Function to set daily challenge
    function setDailyChallenge() {
        const challenge = "Implemente um jogo da velha cooperativo usando programação orientada a objetos";
        document.getElementById('daily-challenge').textContent = challenge;
    }

    // Event listener for new topic form
    const newTopicForm = document.getElementById('new-topic-form');
    newTopicForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = this.querySelector('#topic-title').value;

        // Criar novo tópico
        const newTopic = {
            id: topics.length + 1, // Adicionar um novo ID
            title: title,
            replies: 0 // Inicializar com zero replies
        };

        // Adicionar novo tópico à lista
        topics.push(newTopic);

        // Atualizar estatísticas e exibir novo tópico
        updateStats();
        displayRecentTopics();

        // Limpar formulário
        this.querySelector('#topic-title').value = '';
    });

    // Iniciar funções após o DOM ser carregado
    updateStats();
    displayRecentTopics();
    displayOnlineMembers();
    setDailyChallenge();
});