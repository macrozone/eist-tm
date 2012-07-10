var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/eist');
var Schema = mongoose.Schema;


var PersonSchema = new Schema({
    firstname:  String,
    lastname: String,
    grade: String,
    _currentLocation: { type: Schema.ObjectId, ref: 'Person' }
});

var LocationSchema = new Schema({
    name: String,
    long: Number,
    lat: Number,
    _persons: [{ type: Schema.ObjectId, ref: 'Person' }]
   
});


var Location  = mongoose.model('Story', LocationSchema);
var Person = mongoose.model('Person', PersonSchema);



// test data
/*
var marco = new Person(
  {
    firstname: "Marco",
    lastname: "Wettstein",
    grade: "Sdt"
  });



eist = new Location({
  name: "Eist",
  long: 1234,
  lat: 3451
});

eist._persons.push(marco);
marco._currentLocation = eist;

eist.save(function(error)
  {
    console.log(error);
  });


marco.save(function(error)
  {
    console.log(error);
  });

Location.find({name: "Eist"}).populate("_persons").exec(function(error, data)
  {
    console.log(data);
  });

  
  */
  
  // exports
  module.exports.Location = Location;
  module.exports.Person = Person;
  
  

