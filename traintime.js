
var config = {
    apiKey: "AIzaSyBeNln88dkqL4GJXJe0W_MO7A5ISgxb1ws",
    authDomain: "fremont-awesome.firebaseapp.com",
    databaseURL: "https://fremont-awesome.firebaseio.com",
    storageBucket: "fremont-awesome.appspot.com"
  };
  firebase.initializeApp(config);

var trainDetails = firebase.database();

$("#add-train-btn").on("click", function() {
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
  trainDetails.ref().push(newTrain);

  alert("New Train Added");
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  return false;
});
trainDetails.ref().on("child_added", function(trainNext, prevChildKey) {
      var tName = trainNext.val().name;
      var tDestination = trainNext.val().destination;
      var trainFrequency = trainNext.val().frequency;
      var tFirstTrain = trainNext.val().firstTrain;
      var timeArr = tFirstTrain.split(":");
      var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var lastMoment = moment.max(moment(), trainTime);
      var tMinutes;
      var tArrival;
      
      if (lastMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
      } else {
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % trainFrequency;
        tMinutes = trainFrequency - tRemainder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
      }
        $("#train-table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +  trainFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
      });
  