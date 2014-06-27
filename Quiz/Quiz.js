
var $ = function (id) {
    return document.getElementById(id);
}
var allQuestions = [{
    question: "Who is Prime Minister of the United Kingdom?",
    choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
    correctAnswer:0
},{
    question:"What is the capital of Italy",
    choices:["Rome", "Moscow", "Yerevan"],
    correctAnswer:0
},{
    question:"What is the capital of Mexico",
    choices:["Dublin","Mexico City", "Brussels"],
    correctAnswer:1
}
];
var questionNumber = 0;
var totalScore = 0;

window.onload = function () {

    fillAnswers();
    $("button1").onclick = nextQuestion;
}

var fillAnswers = function(){
    var questionDiv = $('questionDiv');

    if (questionNumber === allQuestions.length) {
        var h2 = document.createElement('h2');
        h2.innerHTML = "Your total score is "+totalScore;
        questionDiv.innerHTML = "";
        questionDiv.appendChild(h2);


    }
    else {
        questionDiv.getElementsByTagName('h2').item(0).innerHTML = 'Question ' + (questionNumber + 1);
        $("answer1").nextSibling.innerHTML = allQuestions[questionNumber].choices[0];
        $("answer2").nextSibling.innerHTML = allQuestions[questionNumber].choices[1];
        $("answer3").nextSibling.innerHTML = allQuestions[questionNumber].choices[2];
    }
}
var nextQuestion = function(){
    var checkedAnswer = checkedRadioBtn('answer_radio');

    if(checkedAnswer!=null) {
        var theQuestion = allQuestions[questionNumber];
        var correctAnswerText = theQuestion.choices[theQuestion.correctAnswer];
        var checkedAnswerText = checkedAnswer.nextSibling.innerHTML;

        if (checkedAnswerText === correctAnswerText) {
            totalScore++;
        }
        checkedAnswer.checked = false;
        questionNumber++;
        fillAnswers();
    }
    else{
        var h3 = document.createElement('h3');
        h3.innerHTML = "Select an answer";
        document.body.appendChild(h3);
    }
}
function checkedRadioBtn(sGroupName)
{
    var group = document.getElementsByName(sGroupName);
    for ( var i = 0; i < group.length; i++) {
        if (group.item(i).checked) {
            return group.item(i);
        } else if (group[0].type !== 'radio') {
            return null;
        }
    }
}

