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

// initial values
var trainName = "no name";
var destination = "nowhere";
var firstTrainTime = 0;
var frequency = 0;

// ---------
// at the initial load and subsequent value changes, get a snapshot of the stored data.
// this function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
     // if firebase has train information stored, update client-side variables
     if (snapshot.child("trainName").exists() &&
     snapshot.child("destination").exists() &&
     snapshot.child("firstTrainTime").exists() &&
     snapshot.child("frequency").exists()) {
         trainName = snapshot.val().trainName;
         destination = snapshot.val().destination;
         firstTrainTime = parseInt(snapshot.val().firstTrainTime);
         frequency = parseInt(snapshot.val().frequency);
     }
     
     // if firebase does not have variable values stored, they remain the same as the
     // values we set when we initialized the variables.
     // in either case, we want to log the values to console and display them on the page.
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
    $("#train-name").text(trainName);
    $("#destination-span").text(destination);
    $("#next-arrival").text(firstTrainTime);
    $("#frequency-span").text(frequency);

    // if any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("the read failed: " + errorObject.code);
    });
    // ------
    // whenever user clicks addTrainBtn add train button
    $("#addTrainBtn").on("click", function(event) {
        event.preventDefault();
        //get the input values
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        // log the user input
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        // save to firebase
        // the ui
        database.ref().set({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency = frequency
        });
    });