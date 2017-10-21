// Firebase
var config = {
  apiKey: "AIzaSyBZMhHEixjA8_poNimXnc5Q856FR7qnf5A",
  authDomain: "train-time-b70c8.firebaseapp.com",
  databaseURL: "https://train-time-b70c8.firebaseio.com",
  projectId: "train-time-b70c8",
  storageBucket: "train-time-b70c8.appspot.com",
  messagingSenderId: "1082136655603"
};
firebase.initializeApp(config);

var database = firebase.database();

// Train Button ---------------------
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

// Grabs user input
  var trainName = $("#trainNameInput").val();
  var destination = $("#destinationInput").val();
  var firstTrain = moment($("#firstTrainInput").val());
  var frequency = $("#frequencyInput").val();


  var newTrain = {
    name: trainName,
    dest: destination,
    start: firstTrain,
    frequency: frequency
  };


  database.ref().push(newTrain);


  console.log(trainName.name);
  console.log(destination.dest);
  console.log(firstTrain.start);
  console.log(frequency.frequency);


  // Clear boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
});

// ------------------------------------
// ------------------------------------


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;


  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);


  var start = moment.unix(firstTrain).format("hh:mm");


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + "next arrival" + "</td><td>" + frequency + "</td><td>" + frequency + "</td></tr>");
});
// // Assumptions
// var tFrequency = 3;
// // Time is 3:30 AM
// var firstTime = "03:30";
//
// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
// console.log(firstTimeConverted);
//
// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
//
// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);
//
// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);
//
// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
//
// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
