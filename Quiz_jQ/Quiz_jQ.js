/**
 * Created by yulia on 6/28/14.
 */
$(document).ready(function() {
    getJSONQuestion();

    $("#next_button").on('click',function(){
        nextQuestion();
    });//end of next_button click event

});//end ready

var allQuestions = [];
var allAnswers = [];

var questionNumber = 0,
    totalScore = 0;
var checkedAnswer;

var fillAnswers = function(){
    var questionDiv = $("#questionDiv");
    var answerErrorDiv = $("#answerErrorDiv");
    var buttonDiv = $("#button_div");

    if (questionNumber === allQuestions.length) {

        answerErrorDiv.empty();
        buttonDiv.empty();

        countTotalScore();
        var h2_total = "<h2>Your total score is "+totalScore+"</h2>";
        questionDiv.html(h2_total);

    }
    else {
        questionDiv.empty();
        answerErrorDiv.empty();

        var h2_number = "<h2>Question " + (questionNumber+1) +"</h2>";
        var h2_question = "<h2>Question " + (allQuestions[questionNumber].question) +"</h2>";

        questionDiv.append(h2_number+h2_question);

        for(var i in allQuestions[questionNumber].choices){

            var radio = $('<input type = "radio" name = "answer_radio" />');
            radio.attr("value", allQuestions[questionNumber].choices[i]);
            questionDiv.append(radio);

            var label = $('<label />');
            label.append(allQuestions[questionNumber].choices[i]+"<br>");
            questionDiv.append(label);


        }
        //select checkbox when the answer text is clicked
        $("label").on('click',function(){
            $(this).prev().attr('checked', 'checked');
        });//end of lable click event

        if(questionNumber>0) {
            if ($("#back_button").length === 0) {
                buttonDiv.append('<button id="back_button">Back</button>');
                $("#back_button").on('click', function () {
                    backQuestion();
                });
            }
        }
        else{
            $("#back_button").detach();
        }
    }
    questionDiv.fadeIn("slow");
    buttonDiv.fadeIn("slow");

}
var getJSONQuestion = function(){
    $.getJSON("questions.json", function(data) {
        $.each(data, function() {
            $.each(this, function(key, value) {
                var obj = {
                    question:value.question,
                    choices:value.choices,
                    correctAnswer:value.correctAnswer
                }
                allQuestions.push(obj);
            });
            fillAnswers();
        });
    });
}
var nextQuestion = function(){

    checkedAnswer= $('input[type="radio"]:checked');


    if(checkedAnswer.length > 0) {
        allAnswers[questionNumber] = checkedAnswer.val();
        questionNumber++;

        $("#button_div").fadeOut("slow");
        $("#questionDiv").fadeOut("slow", function(){

            fillAnswers();
            $('input:radio[name=answer_radio]').filter('[value="' + allAnswers[questionNumber] + '"]').attr('checked', 'checked');
        });
    }
    else{

        $("#answerErrorDiv").html("<h3> Select an answer </h3>");
        $("h3").css("color","red");

    }
}

var backQuestion = function(){
    allAnswers[questionNumber] = $('input[type="radio"]:checked').val();
    questionNumber--;

    $("#button_div").fadeOut("slow");
    $("#questionDiv").fadeOut("slow", function(){

        fillAnswers();
        $('input:radio[name=answer_radio]').filter('[value="'+allAnswers[questionNumber]+'"]').attr('checked', 'checked');

    });

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
