const quizData = [
    {
        question: "O que significa 'Inteligência Artificial'?",
        options: ["🎮 Um jogo de computador", "🤖 Um robô que pode pensar como humanos", "🧸 Uma máquina de fazer brinquedos"],
        answer: 1,
        explanation: "A IA é uma tecnologia que permite que máquinas pensem e aprendam como os humanos, ajudando em várias tarefas do dia a dia."
    },
    {
        question: "Como a IA pode ajudar os estudantes na escola?",
        options: ["📚 Fazendo os deveres de casa por eles", "🧠 Ajudando a encontrar respostas para perguntas difíceis", "🎉 Organizando festas na escola"],
        answer: 1,
        explanation: "A IA pode ajudar a estudar e aprender coisas novas, sugerindo respostas e mostrando como resolver problemas."
    },
    {
        question: "Qual destas tarefas a IA NÃO pode fazer sozinha?",
        options: ["🎮 Aprender a jogar um novo jogo", "🎨 Criar arte e música", "💖 Cuidar dos sentimentos de uma pessoa"],
        answer: 2,
        explanation: "A IA pode fazer muitas coisas, mas não consegue entender ou cuidar dos sentimentos humanos como uma pessoa pode."
    },
    {
        question: "Por que é importante aprender a usar IA?",
        options: ["😄 Porque é divertido e faz os estudos mais fáceis", "⏰ Porque ajuda a controlar o tempo das brincadeiras", "🦸 Porque é uma forma de ganhar superpoderes!"],
        answer: 0,
        explanation: "Aprender a usar IA pode ajudar em muitas áreas, tornando o aprendizado mais interessante e dinâmico."
    },
    {
        question: "Como você pode começar a aprender sobre IA?",
        options: ["🎮 Jogando videogames que usam IA", "🤹 Assistindo a desenhos animados", "📱 Explorando aplicativos educativos e jogos de aprendizagem"],
        answer: 2,
        explanation: "Existem muitos aplicativos e jogos que ensinam sobre IA de uma forma divertida e educativa."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.className = 'option';
        optionButton.innerText = option;
        optionButton.onclick = () => selectOption(optionButton, index);
        optionsContainer.appendChild(optionButton);
    });

    document.getElementById("next-btn").disabled = true;
    document.getElementById("explanation").classList.add('hidden');
}

function selectOption(optionButton, index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected', 'correct', 'incorrect'));

    optionButton.classList.add('selected');
    selectedOptionIndex = index;

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedOption = document.querySelector('.option.selected');
    const explanationElement = document.getElementById("explanation");

    if (selectedOptionIndex === currentQuestion.answer) {
        selectedOption.classList.add('correct');
        selectedOption.innerHTML += " ✔️";
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        selectedOption.innerHTML += " ❌";

        const correctOption = document.querySelectorAll('.option')[currentQuestion.answer];
        correctOption.classList.add('correct');
        correctOption.innerHTML += " ✔️";
    }

    explanationElement.innerText = currentQuestion.explanation;
    explanationElement.classList.remove('hidden');

    document.querySelectorAll('.option').forEach(option => option.disabled = true);
    document.getElementById("next-btn").disabled = false;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 3000);
}

function showResult() {
    document.getElementById("quiz-container").classList.add('hidden');
    document.getElementById("result-container").classList.remove('hidden');
    document.getElementById("score").innerText = `Você acertou ${score} de ${quizData.length} perguntas! 🎉`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").classList.remove('hidden');
    document.getElementById("result-container").classList.add('hidden');
    document.getElementById("score").innerText = '';  // Limpa a mensagem de resultado
    loadQuestion();
}

loadQuestion();