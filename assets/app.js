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
    var database = firebase.database();


 // Whenever the submit button is pushed it stores at the firebase 
 // Also it displays in the DOM
 
 $('#submit').click(function(){
     var name = "";
     var destination = "";
     var trainTime = "";
     var frequency = "";

     name = $('#trainName').val().trim();
     destination = $('#destination').val().trim();
     trainTime = $('#trainTime').val().trim();
     frequency= $('#frequency').val().trim();

     database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
     });      

 });