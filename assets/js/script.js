const questions [
    {
        question: "What is the maximum Ze value for a TT system?",
        answers: [
            {text: ("0.35 ohms"), correct: false},
            {text: ("0.8 ohms"), correct: false},
            {text: "200 ohms", correct: true},
            {text: "1677 ohms", correct: false},
        ]
    },
    {
        question: "What is the correct color sequence for L1, L2, L3?" ,
        answers: [
            { text: "Red, Yellow, Blue", correct: false},
            { text: "Brown, Black, Grey", correct: true},
            { text: "Blue, Black, Grey", correct: true},
            { text: "Brown, Black, Yellow", correct: false},
        ]

    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-choices");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function statQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.array.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
    });
}