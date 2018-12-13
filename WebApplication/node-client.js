var firebase = require("firebase");
firebase.initializeApp({
 serviceAccount: "./service-account.json",
 databaseURL: "https://localization-eab65.firebaseio.com/",
 
});
var ref = firebase.app().database().ref().child("Student");
var primarykey = "MT2017518";
// ref.child(primarykey).orderByChild("Name").on("child_added", function(snapshot) {
  // console.log(snapshot.key + " was " + snapshot.val()+ " meters tall");
// });
ref.once("value")
  .then(function(snapshot) {
  var a = snapshot.numChildren();
  console.log(a);
});