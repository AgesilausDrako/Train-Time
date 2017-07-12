var config = {
    apiKey: "AIzaSyAr0Ale4f3tuWsdhqhkujyRwxFYWQtSXI4",
    authDomain: "claybase-83c0d.firebaseapp.com",
    databaseURL: "https://claybase-83c0d.firebaseio.com",
    projectId: "claybase-83c0d",
    storageBucket: "claybase-83c0d.appspot.com",
    messagingSenderId: "198022101030"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

$("#add-train-btn").on("click", function(){

	event.preventDefault();

	var newTrain = $("#trainName").val().trim();
	var newDestination = $("#destination").val().trim();
	var newTime = $("#time").val().trim();
	var newFrequency = $("#frequency").val().trim();

	var newEntry = {
		train: newTrain,
		destination: newDestination,
		time: newTime,
		frequency: newFrequency
	};

	database.ref().push(newEntry);

	// Logs everything to console
	console.log(newEntry.train);
	console.log(newEntry.destination);
	console.log(newEntry.time);
	console.log(newEntry.frequency);

	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainName").val("");
	$("#destination").val("");
	$("#time").val("");
	$("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

    // Store everything into a variable.
    var newTrain = childSnapshot.val().train;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(newTrain);
    console.log(newDestination);
    console.log(newTime);
    console.log(newFrequency);

	$("#train-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
	  newTrain + "</td><td>" + newFrequency + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
