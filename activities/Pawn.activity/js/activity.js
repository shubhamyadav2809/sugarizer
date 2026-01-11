define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/datastore"], function (activity, env, datastore) {

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        console.log("Pawn Activity started");

        var myButton = document.getElementById("my-button");
        var canvas = document.getElementById("canvas");

        // --- PART 1: LOAD (Jab game khule) ---
        // Check karo ki kya humne pehle koi rang save kiya tha?
        env.getEnvironment(function(error, environment) {
            var currentActivity = environment;
            
            // Agar objectId hai (matlab purana save hai), toh use load karo
            if (currentActivity.objectId) {
                datastore.localStorage.load(function(error, metaData) {
                    // Agar koi 'color' saved hai, toh use wapas lagao
                    if (metaData.activityData && metaData.activityData.color) {
                        canvas.style.backgroundColor = metaData.activityData.color;
                        canvas.innerHTML = "<br><h1>Welcome Back! Saved Color restored.</h1>";
                    }
                });
            }
        });

        // --- PART 2: SAVE (Jab button dabayein) ---
        myButton.onclick = function () {
            // Random rang banao
            var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            
            // Rang badal do
            canvas.style.backgroundColor = randomColor;
            canvas.innerHTML = "<br><h1>Color Saved: " + randomColor + "</h1>";

            // Journal mein Save karo
            var jsonData = { color: randomColor };
            activity.getDatastoreObject().setDataAsText(jsonData);
            activity.getDatastoreObject().save(function (error) {
                if (error === null) {
                    console.log("Color saved successfully.");
                } else {
                    console.log("Error saving color.");
                }
            });
        };

    });

});