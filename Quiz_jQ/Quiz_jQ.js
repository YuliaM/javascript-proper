/**
 * Created by yulia on 6/28/14.
 */

jQuery(document).ready(function() {
    fillAnswers();
    $("#button1").on('click',function(){
        nextQuestion();
    });



});//end ready

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
var allAnswers = [];

var questionNumber = 0,
    totalScore = 0;
var checkedAnswer;

var fillAnswers = function(){

    var questionDiv = $("#questionDiv");
    var answerErrorDiv = $("#answerErrorDiv");
    var nextButtonDiv = $("#nextButtonDiv");

    if (questionNumber === allQuestions.length) {

        answerErrorDiv.text("");
        nextButtonDiv.text("");

        countTotalScore();
        var h2_total = "<h2>Your total score is "+totalScore+"</h2>";
        questionDiv.html(h2_total);

    }
    else {
        questionDiv.text("");
        answerErrorDiv.text("");

        var h2_number = "<h2>Question " + (questionNumber+1) +"</h2>";
        questionDiv.append(h2_number);

        var h2_question = "<h2>Question " + (allQuestions[questionNumber].question) +"</h2>";
        questionDiv.append(h2_question);


        for(var i in allQuestions[questionNumber].choices){

            var radio = $('<input type = "radio" name = "answer_radio" />');
            radio.attr("value", allQuestions[questionNumber].choices[i]);
            questionDiv.append(radio);

            var label = $('<label />');
            label.append(allQuestions[questionNumber].choices[i]+"<br>");
            questionDiv.append(label);


        }
        if(questionNumber>0) {
            if ($("#back_button").length === 0) {
                nextButtonDiv.append('<button id="back_button">Back</button>');
                $("#back_button").on('click', function () {
                    backQuestion();
                });
            }
        }
        else{
            $("#back_button").detach();
        }
    }
}
var nextQuestion = function(){
    checkedAnswer= $('input[type="radio"]:checked');

    if(checkedAnswer.length > 0) {
        allAnswers[questionNumber] = checkedAnswer.val();

        questionNumber++;
        fillAnswers();
        $('input:radio[name=answer_radio]').filter('[value="'+allAnswers[questionNumber]+'"]').attr('checked', 'checked');
    }
    else{

        $("#answerErrorDiv").html("<h3> Select an answer </h3>");
        $("h3").css("color","red");

    }
}

var backQuestion = function(){
    allAnswers[questionNumber] = $('input[type="radio"]:checked').val();

    questionNumber--;
    fillAnswers();
    $('input:radio[name=answer_radio]').filter('[value="'+allAnswers[questionNumber]+'"]').attr('checked', 'checked');



}
var countTotalScore = function(){
    for(var i = 0;i<allQuestions.length;i++){
        var theQuestion = allQuestions[i];
        var correctAnswerText = theQuestion.choices[theQuestion.correctAnswer];
        if(allAnswers[i]===correctAnswerText){
            totalScore++;

        }
    }
}
