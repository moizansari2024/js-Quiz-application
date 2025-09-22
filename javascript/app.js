// app.ts
// Programming Quiz Questions
const questions = [
    {
        id: 1,
        question: "Which language is primarily used for web development on the client side?",
        options: ["Python", "JavaScript", "C++", "Java"],
        correctAnswer: "JavaScript",
        explanation: "JavaScript is the primary language used for client-side web development."
    },
    {
        id: 2,
        question: "Which programming language is known as the backbone of Android app development?",
        options: ["C#", "Java", "Kotlin", "Swift"],
        correctAnswer: "Java",
        explanation: "Java has been the traditional backbone of Android app development, though Kotlin is also widely used now."
    },
    {
        id: 3,
        question: "Which language is mainly used for data science and machine learning?",
        options: ["Python", "Ruby", "C", "Go"],
        correctAnswer: "Python",
        explanation: "Python is popular for data science and machine learning due to its powerful libraries like NumPy, Pandas, and TensorFlow."
    },
    {
        id: 4,
        question: "Which language is commonly used to style web pages?",
        options: ["HTML", "CSS", "Java", "SQL"],
        correctAnswer: "CSS",
        explanation: "CSS (Cascading Style Sheets) is used to style and format web pages."
    },
    {
        id: 5,
        question: "Which of the following is a statically typed language?",
        options: ["JavaScript", "Python", "TypeScript", "PHP"],
        correctAnswer: "TypeScript",
        explanation: "TypeScript is a statically typed superset of JavaScript."
    },
];
// ========== State ==========
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = {};
let currentState = "welcome";
// ========== DOM Elements ==========
const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");
// Buttons (event listener ke liye)
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const reviewBtn = document.getElementById("review-btn");
const backBtn = document.getElementById("back-btn");
// ========== Functions ==========
// Start quiz
function startQuiz() {
    currentState = "question";
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = {};
    showScreen("question");
    renderQuestion();
}
// Show screen
function showScreen(screenName) {
    [welcomeScreen, questionScreen, resultsScreen, reviewScreen].forEach(el => el.classList.add("hidden"));
    if (screenName === "welcome")
        welcomeScreen.classList.remove("hidden");
    if (screenName === "question")
        questionScreen.classList.remove("hidden");
    if (screenName === "results")
        resultsScreen.classList.remove("hidden");
    if (screenName === "review")
        reviewScreen.classList.remove("hidden");
}
// Render question
function renderQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-number").textContent =
        `Question ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById("current-score").textContent =
        `Score: ${score}`;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("question-text").textContent = question.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.innerHTML = `${String.fromCharCode(65 + index)}. ${option}`;
        optionDiv.addEventListener("click", () => selectOption(option));
        if (selectedAnswers[currentQuestionIndex]) {
            if (option === selectedAnswers[currentQuestionIndex]) {
                optionDiv.classList.add(option === question.correctAnswer ? "selected-correct" : "selected-wrong");
            }
            else if (option === question.correctAnswer) {
                optionDiv.classList.add("correct-answer");
            }
            optionDiv.style.pointerEvents = "none";
        }
        optionsContainer.appendChild(optionDiv);
    });
    const explanationDiv = document.getElementById("explanation");
    if (selectedAnswers[currentQuestionIndex]) {
        const isCorrect = selectedAnswers[currentQuestionIndex] === question.correctAnswer;
        document.getElementById("explanation-title").textContent =
            isCorrect ? "Correct!" : "Incorrect";
        document.getElementById("explanation-text").textContent = question.explanation;
        explanationDiv.classList.remove("hidden");
    }
    else {
        explanationDiv.classList.add("hidden");
    }
    prevBtn.style.visibility = currentQuestionIndex > 0 ? "visible" : "hidden";
    if (selectedAnswers[currentQuestionIndex]) {
        nextBtn.disabled = false;
        nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next";
    }
    else {
        nextBtn.disabled = true;
    }
}
// Select option
function selectOption(selectedOption) {
    if (selectedAnswers[currentQuestionIndex])
        return;
    const question = questions[currentQuestionIndex];
    selectedAnswers[currentQuestionIndex] = selectedOption;
    if (selectedOption === question.correctAnswer)
        score++;
    renderQuestion();
}
// Next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
    else {
        finishQuiz();
    }
}
// Prev question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}
// Finish quiz
function finishQuiz() {
    currentState = "results";
    showScreen("results");
    renderResults();
}
// Render results
function renderResults() {
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById("final-score").textContent =
        `${score}/${questions.length}`;
    const resultMessage = document.getElementById("result-message");
    if (percentage >= 80) {
        resultMessage.textContent = "Excellent! You're a quiz master!";
        resultMessage.className = "result-message excellent";
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "Good job! Keep learning!";
        resultMessage.className = "result-message good";
    }
    else {
        resultMessage.textContent = "Keep practicing! You'll improve!";
        resultMessage.className = "result-message needs-improvement";
    }
}
// Restart
function restartQuiz() {
    currentState = "welcome";
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = {};
    showScreen("welcome");
}
// Review
function viewReview() {
    currentState = "review";
    showScreen("review");
    renderReview();
}
function renderReview() {
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";
    questions.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-question";
        reviewDiv.innerHTML = `
            <div class="review-question-title">Question ${index + 1}: ${question.question}</div>
            <div class="review-options">
                ${question.options.map(option => {
            let className = "review-option";
            if (option === question.correctAnswer)
                className += " correct-answer";
            else if (userAnswer === option)
                className += " selected-wrong";
            return `<div class="${className}">${option}</div>`;
        }).join("")}
            </div>
            <div class="user-answer ${isCorrect ? "correct" : "incorrect"}">
                ${isCorrect ? "✅" : "❌"} Your answer: ${userAnswer || "No answer"}
            </div>
            <div class="explanation"><b>Explanation:</b> ${question.explanation}</div>
        `;
        reviewContainer.appendChild(reviewDiv);
    });
}
function backToResults() {
    currentState = "results";
    showScreen("results");
}
// ========== Event Listeners ==========
startBtn?.addEventListener("click", startQuiz);
prevBtn?.addEventListener("click", previousQuestion);
nextBtn?.addEventListener("click", nextQuestion);
restartBtn?.addEventListener("click", restartQuiz);
reviewBtn?.addEventListener("click", viewReview);
backBtn?.addEventListener("click", backToResults);
export {};
//# sourceMappingURL=app.js.map