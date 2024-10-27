const questions = [
    {
        question: "What is the capital city of Mongolia?",
        answers: [
            { text: "Ulaanbaatar", correct: true },
            { text: "Astana", correct: false },
            { text: "Tashkent", correct: false },
            { text: "Bishkek", correct: false }
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for the element gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Pb", correct: false },
            { text: "Fe", correct: false }
        ]
    },
    {
        question: "Who wrote the epic poem 'Paradise Lost'?",
        answers: [
            { text: "John Milton", correct: true },
            { text: "William Shakespeare", correct: false },
            { text: "John Bunyan", correct: false },
            { text: "Samuel Johnson", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Ruby", correct: false }
        ]
    }
];


const questionDisplay = document.getElementById("question"); 
const answerButton = document.getElementById("answer-btn"); 
const nextButton = document.getElementById("next-btn"); 

let questionIndex = 0;
let totalScore = 0;

function startQuiz() {
    questionIndex = 0; 
    totalScore = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetstate();
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1; 
    questionDisplay.innerHTML = questionNumber + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer); 
    });
}

function resetstate() {
    nextButton.style.display = "none"; 
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild); 
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        totalScore++; 
    } else {
        selectBtn.classList.add("incorrect"); 
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); 
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block"; 
}

function showscore() {
    resetstate();
    questionDisplay.innerHTML = `You scored ${totalScore} out of ${questions.length}!`;
    
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}

function handleNext() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion(); 
    } else {
        showscore(); 
    }
}

nextButton.addEventListener("click", () => {
    if (questionIndex < questions.length - 1) { 
        handleNext(); 
    } else {
        showscore(); 
    }
});

startQuiz(); 
