const questions = [
    {
        question: "What are the correct conductor colours for L1, L2, L3?",
        answers: [
            { text: "Red, Yellow, Blue", correct: false },
            { text: "Brown, Black, Grey", correct: true },
            { text: "Brown, Blue, Grey", correct: false },
            { text: "Black, Brown, Yellow", correct: false },
        ]
    },
    {
        question: "What is the maximum Ze value for a TT system?",
        answers: [
            { text: "200 ohms", correct: true },
            { text: "0.35 ohms", correct: false },
            { text: "0.8 ohms", correct: false },
            { text: "1677 ohms", correct: false },
        ]
    },
    {
        question: "What does RCD stand for?",
        answers: [
            { text: "Right Component Detector", correct: false },
            { text: "Residual Current Demonstrator", correct: false },
            { text: "Really Crucial Device", correct: false },
            { text: "Residual Current Device", correct: true },
        ]
    },
    {
        question: "In terms of inspection and testing, what does IR stand for?",
        answers: [
            { text: "Insulation Relief", correct: false },
            { text: "Insulation Resistance", correct: true },
            { text: "Irrational Robot", correct: false },
            { text: "Instant Resistance", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();