"use strict";

(function (){
	var x = [80, 160, 240, 320, 400, 480, 56, 640, 720, 800, 880, 960, 1040];
	var y = [40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720];
	var holes = $(".playhole");
	var xpos;
	var ypos
	var randomHole;
	var selectedHole;
	var score;
	var hit;
	var miss;
	var countdown;
	var timer = 0;


	function randomPosition(a){
		return Math.floor(Math.random()*a.length);
	};
	function gameTime(){
		timer = 30;
		var intervalGameTime = 1000;
		var gameTimeInterval = setInterval(function(){
			if (timer <= 0){
				console.log("All Done!");
				clearInterval(gameTimeInterval);
			} else {
				timer--;
				console.log("You have " + timer + " seconds remaining!");
			};
		}, intervalGameTime);
	};
	function getHole(){
		var rand = randomPosition(holes);
		randomHole = holes[rand];
		console.log(randomHole);
		countdown = 5;
		lights();
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
		if (JSON.stringify(a) == JSON.stringify(b)){
			score += 1;
			hit += 1;
			$(randomHole).animate({
					opacity:0.0
			},100).css({visibility: "hidden"});
			getHole();
		} else {
			miss += 1;
		}
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
		gameTime();
		shuffleNSmack();
		getHole();
	})
})();