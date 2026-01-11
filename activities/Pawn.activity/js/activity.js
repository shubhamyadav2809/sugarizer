define(["sugar-web/activity/activity", "sugar-web/env"], function (activity, env) {

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        console.log("Pawn Activity started");

        // Button dhoondo
        var activityButton = document.getElementById("activity-button");

        // Jab button click ho, tab kya karein?
        activityButton.onclick = function () {
            // Canvas (Background) dhoondo
            var canvas = document.getElementById("canvas");
            
            // Random rang banao
            var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            
            // Rang badal do
            canvas.style.backgroundColor = randomColor;
            
            // Canvas ke andar ka text bhi badal do
            document.getElementById("canvas").innerHTML = "<p>Color Changed: " + randomColor + "</p>";
        };

    });

});
