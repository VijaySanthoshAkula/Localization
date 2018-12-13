var express = require("express");
var cors = require('cors')
var firebase = require("firebase");

firebase.initializeApp({
 serviceAccount: "./service-account.json",
 databaseURL: "https://localization-eab65.firebaseio.com/",
 
});

var app = express()
app.use(cors())
var server = app.listen(process.env.PORT || 8093, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });
 
 // var con = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "Vijay*123",
  // database: "experiment"
// });

var  executeQuery = function(res, query){        
var script='[';
var finalscript="";
var innercounter=0;
var outercounter=0;     
     // con.connect(function (err) {
         // if (err) {   
                     // console.log("Error while connecting database :- " + err);
                     // res.send(err);
                  // }
                  // else {
					  var ref = firebase.app().database().ref(query).orderByKey();
					  ref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
	  script+='{"IDNumber":"'+key+'", ';
	  	  console.log(key);
		  
	  console.log("ENTERED3");
      childSnapshot.forEach(function(superchildSnapshot) {
      // key will be "ada" the first time and "alan" the second time
	  innercounter=innercounter+1;
      var key1 = superchildSnapshot.key;
      var childData = superchildSnapshot.val();
	  if(innercounter==9){
	  script+='"'+key1+'":"'+childData+'" },';
	  console.log("ENTERED2");
	  innercounter=0;
	  }else{
		  script+='"'+key1+'":"'+childData+'", ';
		  console.log("ENTERED1");
	  }
  });
  });
  script=script.substring(0,script.length-1);
  script=script+' ]';
  try {
    // try to parse the JSON
    var obj = JSON.parse(script);
  } catch (e) {
    // if not a json
    console.log("Json wrong format");;
  }
  res.json(obj);
  console.log(script);
});


                      // .then(function(snapshot) {
                      // //result= snapshot.toJSON();
					  // res.json(snapshot);
                      // //console.log(result);
                      // });
					  
						// con.query(query, function (err, result, fields) {
							// if (err) {
								// res.json(err);
								// con.end();
								// throw err;
							// }
							// res.json(result);
							// //res.send(result);
							// // con.end();
							// console.log(result);
						  // });
                       }
      // });   
// }

//GET API
app.get("/", function(req , res){
                var query = "Student";
                executeQuery (res, query);
});