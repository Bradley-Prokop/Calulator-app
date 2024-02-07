var currentNumber=0;
var firstNumber=0;
var operationType;
var operation=false;
var solved=false;
var buttonID;
var answer;

$(".btn").on("click", function(){
    
    buttonID = $(this).attr('id');
    animatePress();
    playSound();

    if($("#"+buttonID).hasClass("value")){ 
       
        if(currentNumber!=0)
            currentNumber += $("#"+buttonID).html();
        else
            currentNumber = $("#"+buttonID).html();
    }
    else if($("#"+buttonID).hasClass("function")){
        firstNumber = parseFloat(currentNumber);
        currentNumber=0;  
        operation=true; 
        operationType=buttonID;              
    }else
        action();
    
    if(operation&&currentNumber===0)
        $("#output").html(firstNumber);
    else
        $("#output").html(currentNumber);
    
    if(solved){
        if(answer%1==0)
            $("#output").html(answer); 
        else
            $("#output").html(answer.toFixed(3)); 
        solved=false;
    }
});

function action(){
    
    switch(buttonID){

        case "All-clear":
            currentNumber = 0;
            firstNumber = 0;
            answer=0;
            break;
        case "negative":
            negativeAndPositive();
            break;
        case "percent":
            percent();
            break;
        default:
            currentNumber = parseFloat(currentNumber);
            solve();
            break;
       }
}

function solve(){

    switch(operationType){
    
    case "add":
        addition();
        break;
    case "subtract":
        subtraction();
        break;
    case "multiply":
        multiplication();
        break;
    default:
        division();
        break;
    }
    solved=true;
    operation=false;
    currentNumber=answer;
}

function addition(){
    answer = currentNumber + firstNumber;
}

function subtraction(){
    answer = firstNumber - currentNumber;
}

function multiplication(){
    answer = currentNumber * firstNumber;
}

function division(){
   answer = firstNumber / currentNumber;
}

function percent(){
    currentNumber=currentNumber/100;
}

function negativeAndPositive(){
    currentNumber*=-1;
}

function playSound(){
    var audioByName = new Audio("click.wav");
    audioByName.play();
}

function animatePress(){
    
    $("#" + buttonID).addClass("default-click");

    setTimeout(function(){
        $("#" + buttonID).removeClass("default-click");
    }, 100);
}
