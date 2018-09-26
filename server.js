var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

users_socketIds = {};
users = {}

io.on('connection', function(socket){

	socket.on('user',function(data){
		console.log(data);
		console.log(socket.id);
		users_socketIds[data]=socket.id;
		console.log(users_socketIds);
		users = Object.keys(users_socketIds)
		console.log(users)
		socket.broadcast.emit('broadcast',users);

	});

	// socket.on('message',function(data){
	// 	console.log('sending message');
  		// socket.broadcast.to(users_socketIds[data.name]).emit('sendMsg',data.message);
 //  	});




});

http.listen(3000, function(){
  console.log('listening on *:3000');
});