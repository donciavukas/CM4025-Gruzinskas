var initPack = {player:[]};
var removePack = {player:[]};



Entity = function(param){
	var self = {
		x:250,
		y:250,
		spdX:0,
		spdY:0,
		id:"",
		map:'map2',
	}
	if(param){
		if(param.x)
			self.x = param.x;
		if(param.y)
			self.y = param.y;
		if(param.map)
			self.map = param.map;
		if(param.id)
			self.id = param.id;		
	}
	
	self.update = function(){
		self.updatePosition();
	}
	self.updatePosition = function(){
		self.x += self.spdX;
		self.y += self.spdY;
	}
	self.getDistance = function(pt){
		return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	}
	return self;
}
Entity.getFrameUpdateData = function(){
	var pack = {
		initPack:{
			player:initPack.player,
		},
		removePack:{
			player:removePack.player,
		},
		updatePack:{
			player:Player.update(),
		}
	};
	initPack.player = [];
	removePack.player = [];
	return pack;
}


Player = function(param){
	var self = Entity(param);
	self.number = "" + Math.floor(10 * Math.random());
	self.username = param.username;
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.maxSpd = 10;
	self.inventory = new Inv(1000000);
	
	var super_update = self.update;
	self.update = function(){
		self.maxSpd = 10 + self.inventory.getSpeed();
		self.updateSpd();	
		super_update();

	}
	self.updateSpd = function(){
		if(self.pressingRight)
			self.spdX = self.maxSpd;
		else if(self.pressingLeft)
			self.spdX = -self.maxSpd;
		else
			self.spdX = 0;
		
		if(self.pressingUp)
			self.spdY = -self.maxSpd;
		else if(self.pressingDown)
			self.spdY = self.maxSpd;
		else
			self.spdY = 0;		
	}
	
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			number:self.number,	
			map:self.map,
		};		
	}
	self.getUpdatePack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,
			map:self.map,
		}	
	}
	
	Player.list[self.id] = self;
	
	initPack.player.push(self.getInitPack());
	return self;
}
Player.list = {};

Player.onConnect = function(socket,username){
	var map = 'map2';
	
	if(Math.random() < 0.5)
		map = 'map';
	var player = Player({
		username:username,
		id:socket.id,
		map:map,
		socket:socket,
	});
	

	socket.on('keyPress',function(data){
		if(data.inputId === 'left')
			player.pressingLeft = data.state; 
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
		else if(data.inputId === 'up')
			player.pressingUp = data.state;
		else if(data.inputId === 'down')
			player.pressingDown = data.state;
	});
	
		socket.on('inventory', function(){
		socket.emit('invItem', player.inventory.getGold());
			for (var i = 0; i < 5; i++) {
		socket.emit('invItem',player.inventory.getGear()[i]);
			}
});

	socket.on('upgradeGear', function(){
		var tier = player.inventory.getTier();
		switch (tier){
                      case 0:{
						if(player.inventory.getGold()>=500){	
							player.inventory.setGold(player.inventory.getGold()-500);
							player.inventory.setTier(1);
							socket.emit('gearUpgradeGo', player.inventory.getGold());
							for (var i = 0; i < 5; i++) {
								socket.emit('gearUpgradeGo',player.inventory.getGear()[i]);
							} 
							}
								break;
							
					}; 
                       case 1:{
						   if(player.inventory.getGold()>=50000){
							player.inventory.setGold(player.inventory.getGold()-50000);
							player.inventory.setTier(2);
							socket.emit('gearUpgradeGo', player.inventory.getGold());
							for (var i = 0; i < 5; i++) {
								socket.emit('gearUpgradeGo',player.inventory.getGear()[i]);
							}
							}
							break;
					   }; 
                       case 2:{
						   if(player.inventory.getGold()>=500000){	
							player.inventory.setGold(player.inventory.getGold()-500000);
							player.inventory.setTier(3);
							socket.emit('gearUpgradeGo', player.inventory.getGold());
							for (var i = 0; i < 5; i++) {
								socket.emit('gearUpgradeGo',player.inventory.getGear()[i]);
							}
							}
							break;
					   }; 
                    }
	});

	socket.emit('init',{
		selfId:socket.id,
		player:Player.getAllInitPack(),
	})
}






Player.getAllInitPack = function(){
	var players = [];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}

Player.onDisconnect = function(socket){
	let player = Player.list[socket.id];
	if(!player)
		return;
	delete Player.list[socket.id];
	removePack.player.push(socket.id);
}
Player.update = function(){
	var pack = [];
	for(var i in Player.list){
		var player = Player.list[i];
		player.update();
		pack.push(player.getUpdatePack());		
	}
	return pack;
}