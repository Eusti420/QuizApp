let questions = [
    {
        "question" : "Wie viel frisst ein Elefant täglich?",
        "answer_1" : "10 kg",
        "answer_2" : "150 kg",
        "answer_3" : "300 kg",
        "answer_4" : "90 kg",
        "right_answer" : "2"
    },
    {
        "question" : "Wie schnell kann ein Bär rennen?",
        "answer_1" : "20 km/h",
        "answer_2" : "80 km/h",
        "answer_3" : "35 km/h",
        "answer_4" : "45 km/h",
        "right_answer" : "4"
    },
    {
        "question" : "Aus wie viel Steinen besteht die Cheops-Pyramide in Gizeh?",
        "answer_1" : "10 Millionen",
        "answer_2" : "2 Millionen",
        "answer_3" : "40 Millionen",
        "answer_4" : "500.000",
        "right_answer" : "2"
    },
    {
        "question" : "Wann fanden die ersten Olympischen Spiele statt?",
        "answer_1" : "1824 n. Chr.",
        "answer_2" : "420 n. Chr",
        "answer_3" : "776 v. Chr.",
        "answer_4" : "123 v. Chr.",
        "right_answer" : "3"
    },
    {
        "question" : "Wie viele Planeten besitzt unser Sonnensystem?",
        "answer_1" : "9",
        "answer_2" : "8",
        "answer_3" : "7",
        "answer_4" : "6",
        "right_answer" : "3"
    },
    {
        "question" : "Wer führte die Germanen in die Varusschlacht 9 n. Chr.?",
        "answer_1" : "Maximus",
        "answer_2" : "Thor",
        "answer_3" : "Arminius",
        "answer_4" : "Hans",
        "right_answer" : "3"
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSucces = new Audio('sound/success.mp3');
let audioFail = new Audio('sound/fail.mp3');


function init() {
    document.getElementById('all-question').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if(currentQuestion >= questions.length) {
        document.getElementById('quiz-container').classList.add('d-none');
        document.getElementById('close-quiz').classList.remove('d-none');
        document.getElementById('all-answers').innerHTML = questions.length;
        document.getElementById('correct-answers').innerHTML = rightQuestions;
    } else { // show question

    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    let question = questions[currentQuestion];

    document.getElementById('progress-bar').innerHTML = percent + "%";
    document.getElementById('progress-bar').style.width = percent + "%";
    document.getElementById('question-count').innerHTML = currentQuestion + 1;
    document.getElementById('current-question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); // letzter Character eines Strings wird ausgelesen

    let idOfRightAnswer = `answer_${question['right_answer']}`; // id der richtigen Anwort für das Jeweilige Objekt im Array wird bestimmt

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSucces.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerContainer();
    showQuestion();
}

function resetAnswerContainer() {
    document.getElementById('next-button').disabled = true;
    document.getElementById('answer_1').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success','bg-danger');
}

function restartQuiz() {
    document.getElementById('quiz-container').classList.remove('d-none');
    document.getElementById('close-quiz').classList.add('d-none');
    currentQuestion = 0;
    rightQuestions = 0;
    init();
}
