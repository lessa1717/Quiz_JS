const questions = [{

    question: "Quantas empresas compoem o grupo Volkswagen?",
    answers: [
        { text: "3", correct: false },
        { text: "5", correct: false },
        { text: "10", correct: true },
        { text: "7", correct: false },
    ]
},

{
    question: "Qual bairro está localizado o escritório da Volkswagen?",
    answers: [
        { text: "Jabaquara", correct: true },
        { text: "Tucuruvi", correct: false },
        { text: "Penha", correct: false },
        { text: "Pinheiros", correct: false },
    ]
},
{
    question: "Qantos anos tem a  Volkswagen?",
    answers: [
        { text: "20 Anos", correct: false },
        { text: "50 Anos", correct: false },
        { text: "10 Anos", correct: false },
        { text: "70 Anos", correct: true },
    ]
},
{
    question: "Qul cidade está localizado o maior polo da Volkswagen?",
    answers: [
        { text: "Bahia", correct: false },
        { text: "Rezende", correct: true },
        { text: "Anápolis", correct: false },
        { text: "Diadema", correct: false },
    ]
}
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();

    } else {
        startQuiz();
    }

})

startQuiz();