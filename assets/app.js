// initialize App

var firebaseConfig = {
    apiKey: "AIzaSyBZNl_8uohD2Lvd4x5575VQrd-yTSc3IPU",
    authDomain: "my-awesome-project-4bdd7.firebaseapp.com",
    databaseURL: "https://my-awesome-project-4bdd7.firebaseio.com",
    projectId: "my-awesome-project-4bdd7",
    storageBucket: "my-awesome-project-4bdd7.appspot.com",
    messagingSenderId: "1028103421412",
    appId: "1:1028103421412:web:7b71b4f85b6c92b1689bf1"
  };

  firebase.initializeApp(firebaseConfig);

  //Set up a variable for the database
    var database = firebase.database().ref();

//Displays current time in the DOM
var currentTime = $('#time');

//Updates the current time displayed in the html
function timeUpdate() {
    const now = moment();
    const readableTime = now.format('hh:mm');

    currentTime.html(readableTime);
}

//Updates the time in 1 second
setInterval (timeUpdate, 1000);


 // Whenever the submit button is pushed it stores at the firebase 
 // Also it displays in the DOM
 $('#submit').click(function(){
     var name = "";
     var destination = "";
     var trainTime = "";
     var frequency = "";


    // Grabbed the values from the input boxes 
    // so it can display into the DOM
     name = $('#trainName').val().trim();
     destination = $('#destination').val().trim();
     trainTime = $('#trainTime').val().trim();
     frequency= $('#frequency').val().trim();

     // Push it to the database storage
     database.push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
     });      

 });

 database.on("child_added", function(childSnapshot){
     
    // Storing the childSnapshot.val() into variables for convenience
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var timeOfTrip = childSnapshot.val().trainTime;
    var freq = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(dest);
    console.log(timeOfTrip);
    console.log(freq);

    var trainTimeConverted = moment(timeOfTrip, "HH:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (remainder)
    var timeRemainder = timeDifference % freq;
    console.log(timeRemainder);

    // Minute Until Train
    var minutesAway = freq - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrainSchedule = moment().add(minutesAway, "minutes").format('hh:mm A');
    console.log("ARRIVAL TIME: " + moment(nextTrainSchedule).format("hh:mm A"));

   var newTrainRow =  $("<tr>").append(`
    <td>${trainName}</td>
    <td>${dest}</td>
    <td>${freq}</td>
    <td>${nextTrainSchedule}</td>
    <td>${minutesAway}</td>
    `);
    

    $(".table > #trainList").append(newTrainRow);





 }, function(errorObject){
     console.log('Errors Handled: ' + errorObject.code);
 });

 