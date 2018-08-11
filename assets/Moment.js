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

var trainData = firebase.database().ref();
//Shows user the current time
$("#currentTime").append(moment().format("hh:mm A"));

// Button for adding trains
$("#addTrainBtn").on("click", function() {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the database
    trainData.push(newTrain);

    // Alert
    alert(newTrain.name + " has been successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#trainFrequencyInput").val("");

    return false;
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot) {

    let data = childSnapshot.val();
    let trainNames = data.name;
    let trainDestin = data.destination;
    let trainFrequency = data.frequency;
    let theFirstTrain = data.firstTrain;
    console.log(theFirstTrain);
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    let tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    let tMinutes = trainFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Add each train's data into the table 
    $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});