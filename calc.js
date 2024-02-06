var currentNumber=0;
var firstNumber=0;
var operationType;
var operation=false;
var solved=false;
var buttonID;
var answer;

// Bugs and other things to fix
// 1) After solving a problem and clicking a number the number gets added instead of being replaced (advanced bug)

$(".btn").on("click", function(){
    
    buttonID = $(this).attr('id');
    animatePress();
    playSound();

    if($("#"+buttonID).hasClass("value")){//if button is a number 
       
        //deals with hanging zero
        if(currentNumber!=0)
            currentNumber += $("#"+buttonID).html();
        else
            currentNumber = $("#"+buttonID).html();
    }
    else if($("#"+buttonID).hasClass("function")){//if button is an operation (add subtract etc)
        firstNumber = parseFloat(currentNumber);//parse and store in firstNumber
        currentNumber=0; //set current number to zero 
        operation=true; //sets true for later display
        operationType=buttonID; //lets solve know what to do             
    }else//called if white button or equals button it clicked
        action();
    
    //Determines the output based on if an operation was clicked or not
    if(operation&&currentNumber===0){
        $("#output").html(firstNumber);
    }else
        $("#output").html(currentNumber);
    
    //Shows the answer if something is calculated
    if(solved){
        $("#output").html(answer.toFixed(4)); 
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

//all of the function below work 100%
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
