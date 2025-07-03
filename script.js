
let arr = [
    {
        id: 1,
        question: "What is your name",
        option: ["Moiz", "Ali", "Taha", "Ahmed"],
        correct: "Moiz",



    },

    {
        id: 2,
        question: "What is your age",
        option: [20, 22, 25, 30],
        correct: 20,
    },

    {
        id: 3,
        question: "What is your nationality",
        option: ["Spanish", "British", "Pakistan", "Afghani"],
        correct: "Pakistan"
    },

    {
        id: 4,
        question: "What is your Qualification",
        option: ["Matric", "Intermediat", "Graduate", "Masters"],
        correct: "Intermediat",
    }

];


let currentQuestion = 0;


function showQuestion() {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = arr[currentQuestion].question;

    let optionElement = document.getElementById("options");
    optionElement.innerHTML = "";

    arr[currentQuestion].option.map(option => {
        optionElement.innerHTML += `
            <label class="option" style="display: block; margin: 5px 0;">
                <input type="radio" name="option" value="${option}">
                ${option}
            </label>`;
    });
}

showQuestion();

function incrementQuestion() {
    currentQuestion++;
    showQuestion()



}





