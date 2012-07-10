
var socket = io.connect('http://192.168.103.139:8080');

var dataInterface = 
{
  addPerson: function(person, callback)
  {
    socket.emit("Person add", person, callback);
  }
  
  
};


dataInterface.onPersonUpdateListeners = [];

// incoming events

socket.on("Person all", function(data)
  {
    $.each(dataInterface.onPersonUpdateListeners, function(index, listener)
      {
       listener(data); 
      });
  });
