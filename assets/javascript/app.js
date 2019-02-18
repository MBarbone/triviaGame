

var triviaQuestions= [{
	question: "What is the name of the school Harry Potter attends?",
	answerList: ["Beauxbatons Academy of Magic", "Hogwarts School of Witchcraft and Wizardry", "Durmstrang Institute", "South Harmon Institute of Technology"],
	answer: 1
// },{
// 	question: "What kind of creature is Buckbeak?",
// 	answerList: ["Hippogriff", "Boggart", "Centaur", "Unicorn"],
// 	answer: 0
// },{
//     question: "What creature protects the Chamber of Secrets?",
// 	answerList: ["Dementors", "Grindylow", "Basilisk", "Dragon"],
// 	answer: 2
// },{
//     question: "What is Harry's Patronus?",
// 	answerList: ["A Rabbit", "A Stag", "A Rat", "An Owl"],
// 	answer: 1
// },{
//     question: "What magical ability do Harry and Voldemort share?",
// 	answerList: ["They are both parseltongues", "They can both see through walls", "They are both excellent Quiditch Players", "They both are skilled at potion making"],
// 	answer: 0
// },{
//     question: "Who is Nagini?",
// 	answerList: ["Hermoine's Cat", "An Auror", "Voldemort's Snake", "Draco Malfoy's Mother"],
// 	answer: 2
// },{
//     question: "What type of dragon did Harry face in his first Tri-Wizard Tournament task?",
// 	answerList: ["Welsh Green Dragon", "Chinese Fireball", "Swedish Short-Snout", "Hungarian Horntail"],
// 	answer: 3
// },{
//     question: "What is Sirius Black's animagus form?",
// 	answerList: ["Wolf", "Dog", "Rat", "Cat"],
// 	answer: 1
// },{
//     question: "Which of these is NOT an Unforgivable Curse?",
// 	answerList: ["Avada Kedavra", "Sectumsempra", "Imperius", "Cruciatus"],
// 	answer: 1
// },{
//     question: "What is a thestral?",
// 	answerList: ["A type of Elf", "A Ghost", "Giant Blue Pixie", "Skeletal Wing-ed Horse"],
// 	answer: 3
// },{
//     question: "Who is the Half-Blood Prince?",
// 	answerList: ["Severus Snape", "Tom Riddle", "Lucious Malfoy", "Draco Malfoy"],
// 	answer: 0
// },{
//     question: "What is the first horcrux Harry destorys?",
// 	answerList: ["Salazar Slytherin's Locket", "Tom Riddle's Diary", "Marvolo Gaunt's Ring", "Rowena Ravenclaw's Diadem"],
// 	answer: 1
}];

// gifs
var gifs= ["correct-gif", "wrong-gif"];

// game vars
var currentQuestion; 
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time; 
var answered;
var userSelect;

// game messages
var alerts = {
	correct: "Yes, that's correct!",
	incorrect: "Oh no! That's incorrect.",
	endTime: "You're Out of Time!",
	quizEnd: "Alright! Let's see how well you know Harry Potter."
};

// functions

$("#start-button").on("click", function(){
    $(this).hide();
    startGame();
});


$("#replayBtn").on("click", function(){
	$(this).hide();
	startGame();
});

function startGame(){
	$("#startScreenImage").hide();
	$('#resultsMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
};


function newQuestion(){
    $("#answerMessage").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered= true;


    $("#currentQuestion").text("Question #"+(currentQuestion+1)+"/"+triviaQuestions.length);
    $(".currentQuestion").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
    
    for(var i=0; i<4; i++){
        var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
        $(".answerList").append(choices);
        choices.addClass("shiny")
        $(".answerList").append(choices);
    };

    countdown();
	//clicking an answer will pause the time and setup answerPage
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
};

function countdown(){
	seconds = 15;
	$("#timeRemaining").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
};

function showCountdown(){
	seconds--;
	$("#timeRemaining").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	};
};

function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty(); //Clears question page
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;



	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#answerMessage").html(alerts.correct);
		$('#gif').html('<img src = "assets/images/correct.gif" width = "300px">');
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#answerMessage").html(alerts.incorrect);
		$('#correctedAnswer').html("The correct answer was: " + rightAnswerText);
		$('#gif').html('<img src = "assets/images/incorrect.gif" width = "300px">');
	} else{
		unanswered++;
		$("#answerMessage").html(alerts.endTime);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
		$('#gif').html('<img src = "assets/images/incorrect.gif" width = "300px">');
		answered = true;
	};
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	};
};

function scoreboard(){
	$("#timeRemaining").empty();
	$("#answerMessage").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	$(".currentQuestion").empty();

	$("#resultsMessage").html(alerts.quizEnd);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#replayBtn").addClass("btn btn-success");
	$("#replayBtn").show();
	$("#replayBtn").text("Try Again?");
};