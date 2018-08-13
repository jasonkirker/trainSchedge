 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCwESi4VQBmC-n5ien3r-bx_0VkRTFjX-8",
    authDomain: "trainschedule-971aa.firebaseapp.com",
    databaseURL: "https://trainschedule-971aa.firebaseio.com",
    projectId: "trainschedule-971aa",
    storageBucket: "",
    messagingSenderId: "151181458494"
};
firebase.initializeApp(config);

// create a variable to reference the database
var database = firebase.database();


var trainName;
var destination;
var firstTrain;
var frequency;
var newTableRow;
var nextArrival;
var minutesAway;

$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    //push to server

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

database.ref().on("child_added", function (childSnapshot) {
   
    var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    console.log("Minutes until next train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));


    newTableRow = $("#trainInfo").append("<tr>");
    newTableRow.append("<td>" + childSnapshot.val().name + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().destination + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().frequency + "</td>");
    newTableRow.append("<td>" + (moment(nextTrain.format("hh:mm")) + "</td>"));
    newTableRow.append("<td>" + tMinutesTillTrain + "</td>");
});