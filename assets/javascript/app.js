var config = {
    apiKey: "AIzaSyC2dUMyqWzbNTUFrMNgqQGUwEpl-HKuZXw",
    authDomain: "train-time-17d66.firebaseapp.com",
    databaseURL: "https://train-time-17d66.firebaseio.com",
    projectId: "train-time-17d66",
    storageBucket: "",
    messagingSenderId: "363894535170"
 };

 firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

$("#add-train-btn").on("click", function(){

	event.preventDefault();

	// Prevents the user from submitting without text
    if ($("input").val() === "") {
    	console.log("Invalid input!");
    	return false
    } else {

		var newTrain = $("#trainName").val().trim();
		var newDestination = $("#destination").val().trim();
	    var newFirstTime = $("#firstTime").val().trim();
		var newFrequency = $("#frequency").val().trim();
	    
		database.ref("/trains").push({
			train: newTrain,
			destination: newDestination,
			frequency: newFrequency,
			time: newFirstTime
		});

		// Clears all of the text-boxes
		$("#trainName").val("");
		$("#destination").val("");
		$("#firstTime").val("");
		$("#frequency").val("");
	}	

});

database.ref("/trains").on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

    var newTrain = childSnapshot.val().train;
    var newDestination = childSnapshot.val().destination;
    var newFrequency = childSnapshot.val().frequency;
    var newFirstTime = childSnapshot.val().time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(newFirstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = newFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var next = moment(nextTrain).format("hh:mm");

    console.log(newTrain);
    console.log(newDestination);
    console.log(next);
    console.log(newFrequency);
    console.log(tMinutesTillTrain);

	$("#train-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
	  newFrequency + "</td><td>" + next + "</td><td>" + tMinutesTillTrain);
	}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
});

