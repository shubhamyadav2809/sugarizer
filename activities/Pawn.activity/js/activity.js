define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/datastore", "webL10n"], function (activity, env, datastore, l10n) {

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();
        
        // Language setup
        env.getEnvironment(function(err, environment) {
            // User ki language set karo (default English 'en')
            var defaultLanguage = (typeof chrome != 'undefined' && chrome.app && chrome.app.runtime) ? chrome.i18n.getUILanguage() : navigator.language;
            var language = environment.user ? environment.user.language : defaultLanguage;
            l10n.language.code = language;
            
            // Dictionary load karo
            window.addEventListener('localized', function() {
                // Screen par jo "Hello World" hai, use translate karo
                var helloText = document.querySelector("#canvas p");
                if (helloText) {
                    helloText.innerHTML = l10n.get("Hello World!");
                }
            });
        });

        console.log("Pawn Activity started");

        var myButton = document.getElementById("my-button");
        var canvas = document.getElementById("canvas");

        // --- PART 1: LOAD ---
        if (env.objectId) {
            datastore.localStorage.load(function(error, metaData) {
                if (metaData.activityData && metaData.activityData.color) {
                    canvas.style.backgroundColor = metaData.activityData.color;
                    // Translate "Welcome Back" message
                    canvas.innerHTML = "<br><h1>" + l10n.get("RestoredColor") + "</h1>";
                }
            });
        }

        // --- PART 2: SAVE ---
        myButton.onclick = function () {
            var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            canvas.style.backgroundColor = randomColor;
            
            // Translate "Color Saved" message with parameter
            canvas.innerHTML = "<br><h1>" + l10n.get("SavedColor", {color: randomColor}) + "</h1>";

            var jsonData = { color: randomColor };
            activity.getDatastoreObject().setDataAsText(jsonData);
            activity.getDatastoreObject().save(function (error) {
                if (error === null) {
                    console.log("Color saved.");
                }
            });
        };
    });
});