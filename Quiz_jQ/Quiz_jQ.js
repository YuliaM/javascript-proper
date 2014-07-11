/**
 * Created by yulia on 6/28/14.
 */


var allQuestions = [];
var allAnswers = [];

var questionNumber = 0,
    totalScore = 0;
var checkedAnswer;

$(document).ready(function() {

    //LENA TUT VOPROS: PRAVILNEE SOZDAVAT GLOBAL VAR DLYA DIV-OV,
    // PROSTO SOZDAVAT VAR DLYA DIV OV V TELE FUNKCII GDE ONI NUJNY,
    //ILI NEPOSREDSTVENNO VYZYVAT HEREZ NAPRIMER $("div#main_content").TEXT()?

    mainContentDiv = $("div#main_content");
    answerErrorDiv = $("div#answerErrorDiv");
    questionDiv = $("div#questionDiv");
    buttonDiv = $("div#button_div");
    loginDiv = $("div#login");

    $("#log_out_button").on('click',function(){
        localStorage.removeItem("quizUserName");
        mainContentDiv.empty();
        loginDiv.show();

    });//end of log_out_button click event

    $("#next_button").on('click',function(){
        nextQuestion();
    });//end of next_button click event

//    $("#back_button").on('click', function () {
//        backQuestion();
//    });//end of back_button click event

    $('#loginForm').submit(function(e){
        quizUserName = $("#quizUserName").val();
        localStorage.setItem("quizUserName", quizUserName);
    });//end of login form submit function

    loginFunction();



});//end ready

var fillAnswers = function(){

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
        var h2_question = "<h2>"+(allQuestions[questionNumber].question) +"</h2>";

        questionDiv.append(h2_number+h2_question);

        for(var i in allQuestions[questionNumber].choices){

            var radio = $('<input type = "radio" name = "answer_radio" />');
            radio.attr("value", allQuestions[questionNumber].choices[i]);
            questionDiv.append(radio);

            var label = $('<label>'+ allQuestions[questionNumber].choices[i]+"<br>"+'</label>');
            //label.append(allQuestions[questionNumber].choices[i]+"<br>");
            radio.after(label);
            //questionDiv.append(label);


        }
        //select checkbox when the choice text is clicked
        $("label").on('click',function(){
            $(this).prev().attr('checked', 'checked');
        });//end of lable click event

        if(questionNumber>0) {
            if ($("#back_button").length === 0) {
                buttonDiv.append('<button id="back_button">Back</button>');

                //LENO, TUT U MENYA VOPROS. V IDEALE VLE CLICK EVENTS DOLJNY BYT V DOCUMENT.READY.
                //NO KOGDA YA VYNOSHU ETOT BACK_BUTTON CLICK IZ ETOGO MESTA BACK BUTTON PERESTAET RABOTAT,
                //XOTYA YA ISPOLZUYU DETACH A NE REMOVE

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

        buttonDiv.fadeOut("slow");
        questionDiv.fadeOut("slow", function(){

            fillAnswers();
            $('input:radio[name=answer_radio]').filter('[value="' + allAnswers[questionNumber] + '"]').attr('checked', 'checked');
        });
    }
    else{

        answerErrorDiv.html("<h3> Select an answer </h3>");
        $("h3").css("color","red");

    }
}

var backQuestion = function(){
    allAnswers[questionNumber] = $('input[type="radio"]:checked').val();
    questionNumber--;

    buttonDiv.fadeOut("slow");
    questionDiv.fadeOut("slow", function(){

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
var loginFunction = function(){

    if(localStorage.getItem("quizUserName")!=undefined){

        $("div#greeting_div").append("Welcome, "+ localStorage.quizUserName +"!");

        //ETOT HIDE/SHOW MENYA RAZDRAJAET. T.K. LYUBOY cross site script  UMEET HIDE OTKRYVAT
        //KAK TY DUMAESH MOJET PRAVILNEE KAJDY RAZ SOZDAVAT NOVUYU LOGIN FORMU?
        loginDiv.hide();
        getJSONQuestion();

    }
    else{
        loginDiv.show();
        mainContentDiv.hide();
    }

}
