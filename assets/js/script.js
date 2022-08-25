
    var welcome = document.querySelector("#introduction");
    var startBtn = document.querySelector("#startBtn");
    var introSection =document.querySelector("#intro-section");
    
    var questions = document.querySelector("#questions");
    var askQuestion = document.querySelector("#ask-questions");
    
    var choices = document.querySelectorAll(".choices");
    var answerBtn1 = document.querySelector("#answer_btn1");
    var answerBtn2 = document.querySelector("#answer_btn2");
    var answerBtn3 = document.querySelector("#answer_btn3");
    var answerBtn4 = document.querySelector("#answer_btn4");
    
    var accuracy = document.querySelector("#accuracy");
    var scoreBoard = document.querySelector("#submit");
    var finalScore = document.querySelector("#final_score");
    var userInitial =document.querySelector("#initial");
    
    var submitBtn =document.querySelector("#submit_btn");
    var highScorePage =document.querySelector("#highscore-page");
    var scoreRecord =document.querySelector("#score_record");
    var scoreCheck =document.querySelector("#highscore");
    var finish =document.querySelector("#finish");
    
    var backBtn =document.querySelector("#back_btn");
    var clearBtn=document.querySelector("#clear_btn");
    

    var codeQuestions = [
        {
            question: "Which of the following are NOT examples of primitives?",
            choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
            answer: "c"
        },
        {
            question: "What symbol do you use for objects?",
            choices: ["a. curly brackets {}", "b. quotation marks ", "c. square brackets", "d. periods "],
            answer: "a"
        },
        {
            question: "What symbol do you use for arrays?",
            choices: ["a. curly brackets {}", "b. quotation marks ", "c. square brackets", "d. periods "],
            answer: "c"
        },
        {
            question: "What number does an array begin with?",
            choices: ["a. 1", "b. 0", "c. 8", "d. any"],
            answer: "b"
        }
    ];


    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;

    function countdown() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    
                    finish.textContent = "Time is up!";
                    gameOver();
    
                } else  if(questionCount >= codeQuestions.length + 1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    

    function startQuiz () {
            introSection.style.display = "none";
            questions.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
          
    }

    function showQuestion (n) {
            askQuestion.textContent = codeQuestions[n].question;
            answerBtn1.textContent = codeQuestions[n].choices[0];
            answerBtn2.textContent = codeQuestions[n].choices[1];
            answerBtn3.textContent = codeQuestions[n].choices[2];
            answerBtn4.textContent = codeQuestions[n].choices[3];
            questionNumber = n;
        }
    
    
    function checkAnswer(event) {
        event.preventDefault();
    
        accuracy.style.display = "block";
        setTimeout(function () {
            accuracy.style.display = 'none';
        }, 1000);
    
     
        if (codeQuestions[questionNumber].answer == event.target.value) {
            accuracy.textContent = "Correct!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 10;
            accuracy.textContent = "Wrong! The correct answer is " + codeQuestions[questionNumber].answer + ".";
        }
  
        if (questionNumber < codeQuestions.length - 1 ) {
  
            showQuestion(questionNumber + 1);
        } else {
        gameOver();
    }
    questionCount++;
    }
  
    function gameOver() {
    
            questions.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
          
            finalScore.textContent = "Your final score is: " + totalScore;
         
            timeLeft.style.display = "none"; 
    };
    

    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            latestList = JSON.parse(currentList);
            return latestList;
        } else {
            latestList = [];
        }
        return latestList;
    };
    
    

    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
  
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];

        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
  
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }

    startBtn.addEventListener("click", startQuiz);
    

    choices.forEach(function(click){
    
        click.addEventListener("click", checkAnswer);
    });
    
    
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introSection.style.display = "none";
        highScorePage.style.display = "block";
        questions.style.display ="none";
        saveScore();
    });
    

    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introSection.style.display = "none";
        highScorePage.style.display = "block";
        questions.style.display ="none";
        renderScore();
    });
    
 
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introSection.style.display = "block";
            highScorePage.style.display = "none";
            questions.style.display ="none";
            location.reload();
    });
    

    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });
