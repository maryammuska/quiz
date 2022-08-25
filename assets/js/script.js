var highScore = document.querySelector(".highScore");
var goBack = document.querySelector(".goBack");
var questions = document.querySelector(".quizQuestions")
var btn = document.getElementById("startTime")


questions.addEventListener("click", function () {
    localStorage.questions();
    location.reload();
});
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

document.body.appendChild(btn);