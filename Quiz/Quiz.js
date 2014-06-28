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



var fillAnswers = function(){
    var questionDiv = $("questionDiv");
    var answerErrorDiv = $("answerErrorDiv");
    var nextButtonDiv = $("nextButtonDiv");

    if (questionNumber === allQuestions.length) {
        questionDiv.innerHTML = "";
        answerErrorDiv.innerHTML = "";
        nextButtonDiv.innerHTML = "";


        var h2 = document.createElement('h2');
        h2.innerHTML = "Your total score is "+totalScore;

        questionDiv.appendChild(h2);

    }
    else {
        questionDiv.innerHTML = "";
        answerErrorDiv.innerHTML = "";

        var h2 = document.createElement('h2');
        h2.innerHTML = 'Question ' + (questionNumber + 1)+"<br>"+allQuestions[questionNumber].question+"<br>";
        questionDiv.appendChild(h2);


        for(var i in allQuestions[questionNumber].choices){
            var label = document.createElement("label");
            var radio = document.createElement("input");

            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "answer_radio");
            radio.setAttribute("value", allQuestions[questionNumber].choices[i]);

            label.appendChild(radio);
            label.innerHTML += allQuestions[questionNumber].choices[i]+"<br>";

            questionDiv.appendChild(label);

        }
    }
}
var nextQuestion = function(){
    var checkedAnswer = checkedRadioBtn('answer_radio');

    if(checkedAnswer!=null) {
        var theQuestion = allQuestions[questionNumber];
        var correctAnswerText = theQuestion.choices[theQuestion.correctAnswer];

        if (checkedAnswer.value === correctAnswerText) {
            totalScore++;
        }
        checkedAnswer.checked = false;
        questionNumber++;

        fillAnswers();
    }
    else{
        var h3 = document.createElement('h3');
        h3.innerHTML = "Select an answer";

        var answerErrorDiv = $("answerErrorDiv");
        answerErrorDiv.innerHTML = "";
        answerErrorDiv.appendChild(h3);
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

window.onload = function () {
    fillAnswers();
    $("button1").onclick = nextQuestion;
}