var model = require("./model");
var express = require('express')
, http = require('http');

var app = express();



// Configuration

app.configure(function(){
    app.set('port', 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    // app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

app.get('/about', function(req, res){
    res.render('about', {
        title: 'About'
    });
});

app.get('/contact', function(req, res){
    res.render('contact', {
        title: 'Contact'
    });
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});



var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log("client connection"); 
    
    model.Person.find({}, function(error, data)
      {
        socket.emit("Person all", data);
      });
    
    socket.on("Person add", function(data, callback)
      {
        
        
        var person = new model.Person(data);
        console.log("adding new person");
        person.save(function(error)
          {
            if(typeof callback == "function") callback(error); 
            
            if(!error)
            {
              // broadcast users to others
              model.Person.find({}, function(error, data)
                {
                
                  socket.broadcast.emit("Person all", data.reverse());
                });
            }
          });
        
      });
});

