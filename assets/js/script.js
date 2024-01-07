document.addEventListener("DOMContentLoaded", function () {
    


    /**
     * The question variables and answers for the main quiz.
     */

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
        },

        {
            question: "What does CPC stand for?",
            answers: [
                { text: "circuit protective consumer", correct: false },
                { text: "conductor premature corrosion", correct: false },
                { text: "circuit prior consultant", correct: false },
                { text: "circuit protective conductor", correct: true },
            ]
        }
    ];



    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    

    /**
     * sets the question index and score to 0.
     */

    let currentQuestionIndex = 0;
    let score = 0;


    /**
     * The start quiz function.
     * Resets question index and score back to 0 before calling show question
     * function to restart the quiz
     */

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }

    /**
     * Show question function, gets the questions from the variables above and 
     * displays them in the html question area, increasing by 1 each time to cycle 
     * through all questions.
     * Also displays the answer variables for each question in the form of buttons
     * inside the html.
     */

    function showQuestion() {
        resetState();
        startTimer();
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

    /**
     * Removes previous answers in order to display nest question and answers.
     */

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    /**
     * checks to see if the answer is correct, if correct it will display class 
     * correct. if incorrect it will display class incorrect. These classes have
     * been styled with green and red backgrounds accordingly. Disables the user 
     * from selecting another answer and displays next button. increases score by 1.
     */

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
            stopTimer();

        } else {
            selectedBtn.classList.add("incorrect");
            stopTimer();
        }
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";

    }

    /**
     * Shows the score at the end of the quiz
     * displays 'play again' button to restart quiz
     */

    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    /**
     * checks the question index is less than question length, if so it will call
     * show question function. If it is equal the show score function will be called
     * and the user will see how many correct answers they scored.
     */

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    // custom javascript for resubmission

    /**
     * Timer function for questions, gives the user 15 seconds to answer.
     * changes numbers from green, to amber and red depending on how much
     * time is left. Calls the handle next button function if time runs out.
    */
    function startTimer() {
        var startTime = 15;
        timer = setInterval(function () {
            document.getElementById('timer').innerHTML = startTime;
            startTime--;
            if (startTime <= 15) {
                document.getElementById('timer').style.color = "#00d400";
                console.log('green');
            }

            if (startTime <= 9) {
                document.getElementById('timer').style.color = "#ffbf00";
                console.log('amber');

            }

            if (startTime <= 4) {
                document.getElementById('timer').style.color = "#ff0000";
                console.log('red');
            }

            if (startTime <= 2) {
                document.getElementById('timer').style.color = "#ff0000";
                shakeScreen()
                console.log('shake');
            }

            if (startTime <= -1) {
                stopTimer()
                handleNextButton();


            }

        }, 1000);

    }

    // custom javascript for resubmission

    /**
     * Stops the timer counting down, clears the interval of the timer.
     */

    function stopTimer() {
        clearInterval(timer);
        document.getElementById('timer').innerHTML = '';
    }


    /**
     * checks the question index is less than question length, if so next button
     * will appear, if it is equal to question length, start quiz function will be 
     * called.
     */
    
    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

    // custom javascript for resubmission

    /**
     * Adds the class of shake to the body which handles the css foor the shake
     * screen effect. After 3 seconds removes the shake class from the body to
     * stop the screen shaking.
     */

    function shakeScreen() {
        document.body.classList.add('shake');

        setTimeout(function(){
            document.body.classList.remove('shake');
        }, 5000);
    }

    startQuiz();

});