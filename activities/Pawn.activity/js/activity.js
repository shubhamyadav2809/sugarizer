define(["sugar-web/activity/activity", "sugar-web/env"], function (activity, env) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

		console.log("Pawn Activity started");

        // --- PURANA CODE (Home Button) ---
		var activityButton = document.getElementById("activity-button");
        activityButton.onclick = function () {
            console.log("Original button clicked");
        };

        // --- NAYA CODE (Star Button Logic) ---
        // 1. Humare Star button ko dhoondo
        var myButton = document.getElementById("my-button");

        // 2. Jab Star button click ho, tab kya karein?
        myButton.onclick = function () {
            // Canvas (Background) dhoondo
            var canvas = document.getElementById("canvas");
            
            // Random rang (Color) banao
            var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            
            // Rang badal do
            canvas.style.backgroundColor = randomColor;
            
            // Screen par likho ki Star button dabaya hai
            document.getElementById("canvas").innerHTML = "<br><h1>⭐ Star Power! Color: " + randomColor + "</h1>";
        };

	});

});