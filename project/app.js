
require('./Database');
require('./Entity');
require('./client/Inv');
require('./Market');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.");

var SOCKET_LIST = {};

var market = new Market;


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	
	socket.on('signIn',function(data){ //{username,password}
		Database.isValidPassword(data,function(res){
			if(!res)
				return socket.emit('signInResponse',{success:false});
			Database.getPlayer(data.username,function(){
				Player.onConnect(socket,data.username);
				socket.emit('signInResponse',{success:true});
			})
		});
	});
	socket.on('signUp',function(data){
		Database.isUsernameTaken(data,function(res){
			if(res){
				socket.emit('signUpResponse',{success:false});		
			} else {
				Database.addUser(data,function(){
					socket.emit('signUpResponse',{success:true});					
				});
			}
		});		
	});
	
	socket.on('market', function(){
		for(var i = 0; i < market.items.length; i++){
			socket.emit('marketItem', market.items[i]);
		}
	});
	
	
		socket.on('sendMsgToServer',function(data, data2){
		for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit('addToChat',data2 + ': ' + data);
		}
	});
	
	
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
	
	socket.on('evalServer',function(data){
		if(!DEBUG)
			return;
		var res = eval(data);
		socket.emit('evalAnswer',res);		
	});
	
	
	
});


setInterval(function(){
	var packs = Entity.getFrameUpdateData();
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('init',packs.initPack);
		socket.emit('update',packs.updatePack);
		socket.emit('remove',packs.removePack);
	}
	
},1000/25);







