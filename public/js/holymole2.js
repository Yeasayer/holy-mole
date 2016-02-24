"use strict";

(function (){
	var x = [80, 160, 240, 320, 400, 480, 56, 640, 720, 800, 880, 960, 1040];
	var y = [40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600];
	var sounds = [];
	sounds[0] = document.getElementById("sound1");
	sounds[1] = document.getElementById("sound2");
	sounds[2] = document.getElementById("sound3");
	var holes = $(".playhole");
	var xpos;
	var ypos
	var randomHole;
	var selectedHole;
	var score = 0;
	var hit = 0;
	var miss = 0;
	var count = 0;
	var highscore = 0;
	var countdown;
	var timer = 0;
	var gameOn = false;


	function randomPosition(a){
		return Math.floor(Math.random()*a.length);
	};
	function gameTime(){
		timer = 30;
		var intervalGameTime = 1000;
		$("#timer").empty();
		$("#timer").append(timer);
		var gameTimeInterval = setInterval(function(){
			if (timer <= 0){
				console.log("All Done!");
				console.log(gameOn);
				score = 0;
				hit = 0;
				count = 0;
				$("button").css({
					"background-color":"green",
					"border-color":"darkgreen"
				});
				gameOn = false;
				console.log(gameOn);
				clearInterval(gameTimeInterval);
			} else {
				timer--;
				$("#timer").empty();
				$("#timer").append(timer);
				console.log("You have " + timer + " seconds remaining!");
			};
		}, intervalGameTime);
	};
	function getHole(){
		sounds[2].play();
		if (gameOn == true){
			var rand = randomPosition(holes);
			randomHole = holes[rand];
			console.log(randomHole);
			count++;
			countdown = 5;
			lights();
		}
	};
	function lights(){
		var interval1;
		var interval2;
		if (hit > 0){
			interval1 = 5000-(100*hit);
			interval2 = 1000-(25*hit);
		} else {
			interval1 = 5000;
			interval2 = 1000;
		};
		$(randomHole).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, interval2);
		var timerInterval = setInterval(function(){
			if (countdown <= 0 && timer > 0){
				$(randomHole).animate({
					opacity:0.0
				},interval2).css({visibility: "hidden"});
				miss++;
				clearInterval(timerInterval);
				getHole();
			} else if (countdown <= 0 && timer <= 0){
				$(randomHole).animate({
					opacity:0.0
				},interval2).css({visibility: "hidden"});
				clearInterval(timerInterval);
			} else {
				$(randomHole).animate({
					opacity:".5"
				}, interval2).animate({
					opacity:"1"
				}, interval2);
				countdown--;
				console.log(countdown);
			};
			if (JSON.stringify(selectedHole) == JSON.stringify(randomHole)){
				clearInterval(timerInterval);
			};
		}, interval1);
	};
	function conflictResolution(a,b){
		if (JSON.stringify(a) == JSON.stringify(b) && (gameOn == true)){
			sounds[1].play();
			score += 1;
			hit += 1;
			$("#score").empty();
			$("#score").append(score);
			console.log(score);
			$(randomHole).animate({
					opacity:0.0
			},100).css({visibility: "hidden"});
			checkYoSelf(hit, count);
			getHole();
		} else {
			miss += 1;
		}
	};
	function checkYoSelf(a,b){
		var accuracy = (a/b);
		$("#accuracy").empty();
		$("#accuracy").append((accuracy.toFixed(2)*100) + "%");
		if (score >= highscore){
			highscore = score;
			$("#highscore").empty();
			$("#highscore").append(highscore);
		};
	};
	function shuffleNSmack(){
		holes.each(function (index){
			xpos = randomPosition(x);
			ypos = randomPosition(y);
			selectedHole = holes[index];
			$(this).css("top", y[ypos]).css("left", x[xpos]);
			$(this).click(function(){
				var selectedHole = holes[index];
				$(selectedHole).animate({
					opacity: ".5"
				}, 250).animate({
					opacity: "1"
				}, 250);
				console.log(selectedHole);
				conflictResolution(selectedHole, randomHole);
			});
		});
	};
	$("#gamestart").click(function(){
		if (gameOn == false){
			gameOn = true;
			$("button").css({
				"background-color":"red",
				"border-color":"darkred"
			});
			sounds[0].play();
			$('#score').empty();
			$('#score').append(score);
			gameTime();
			shuffleNSmack();
			getHole();
		}
	})
})();