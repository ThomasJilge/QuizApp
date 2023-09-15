let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was ist die Hauptstadt von Thailand?",
        "answer_1": "Peking",
        "answer_2": "Kapstadt",
        "answer_3": "Sydney",
        "answer_4": "Bangkok",
        "right_answer": 4
    },
    {
        "question": "Wer wurde Weltfußballer 2014?",
        "answer_1": "Franck Ribery",
        "answer_2": "Cristiano Ronaldo",
        "answer_3": "Lionel Messi",
        "answer_4": "Bastian Schweinsteiger",
        "right_answer": 2
    },
    {
        "question": "Wer hält den Weltrekord im 100m Sprint?",
        "answer_1": "Usain Bolt",
        "answer_2": "Oliver Kahn",
        "answer_3": "Mario Barth",
        "answer_4": "Yohan Blake",
        "right_answer": 1
    },
    {
        "question": "Was ist das größte Passagierflugzeug der Welt?",
        "answer_1": "Airbus A350",
        "answer_2": "Boing 777",
        "answer_3": "Airbus A380",
        "answer_4": "Boing 747",
        "right_answer": 3
    }
];


let rightQuestions = 0;
let currentQuestion = 0;
let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');


function render() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    updateProgressBar();
    showQuestion();
}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = percent * 100;
    document.getElementById('progressBar').innerHTML = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('numberQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
    document.getElementById('headerIMG').src = 'img/trophy.png';
    updateProgressBar();
}


function answerQuestion(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (!question.hasOwnProperty('answered')) {
        disableAnswerButtons();
        if (selectedQuestionNumber == question['right_answer']) {
            document.getElementById(selection).parentNode.classList.add('bg-success');
            audioSuccess.play();
            rightQuestions++;
        } else {
            document.getElementById(selection).parentNode.classList.add('bg-danger');
            document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
            audioFail.play();
        }
        question['answered'] = true;
        document.getElementById('nextButton').disabled = false;
    }
}


function disableAnswerButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).disabled = true;
    }
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButton();
    showQuestion();
}


function resetAnswerButton() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
    }
}


function newGame() {
    document.getElementById('headerIMG').src = 'img/quizIMG.png';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';
    rightQuestions = 0;
    currentQuestion = 0;
    render();
}