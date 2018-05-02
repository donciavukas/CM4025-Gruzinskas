Inv = (function () {
    function Inv(items, gold) {
        var _this = this;
		this.gear = new Array(5);
        if (((items != null && items instanceof Array && (items.length == 0 || items[0] == null || (items[0] != null && items[0] instanceof Item))) || items === null) && ((typeof gold === 'number') || gold === null)) {
            var __args = Array.prototype.slice.call(arguments);
            this.gold = 0;
            this.boots = null;
            this.armor = null;
            this.gloves = null;
            this.headGear = null;
            this.shovel = null;
            this.gold = 0;
            this.boots = null;
            this.armor = null;
            this.gloves = null;
            this.headGear = null;
            this.shovel = null;
			this.gear = new Array(5);
			this.tier = null;
            (function () {
                _this.gold = gold;
                for (var i = 0; i < items.length; i++) {
                    switch ((items[i].name)) {
                        case "head":
                            _this.headGear = items[i];
                        case "armor":
                            _this.armor = items[i];
                        case "boots":
                            _this.boots = items[i];
                        case "gloves":
                            _this.gloves = items[i];
                        case "shovel":
                            _this.shovel = items[i];
                    }
                }
                ;
				_this.gear[0] = _this.headGear;
                _this.gear[1] = _this.armor;
                _this.gear[2] = _this.boots;
                _this.gear[3] = _this.gloves;
                _this.gear[4] = _this.shovel;
				_this.tier = _this.armor.tier;
            })();
        }
        else if (((typeof items === 'number') || items === null) && gold === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            var gold_1 = __args[0];
            this.gold = 0;
            this.boots = null;
            this.armor = null;
            this.gloves = null;
            this.headGear = null;
            this.shovel = null;
            this.gold = 0;
            this.boots = null;
            this.armor = null;
            this.gloves = null;
            this.headGear = null;
            this.shovel = null;
			this.gear = new Array(5);
			this.tier = null;
            (function () {
                _this.gold = gold_1;
                _this.headGear = new Item(0, "head", 0);
                _this.armor = new Item(0, "armor", 0);
                _this.boots = new Item(0, "boots", 0);
                _this.gloves = new Item(0, "gloves", 0);
                _this.shovel = new Item(0, "shovel", 0);
				_this.gear[0] = _this.headGear;
                _this.gear[1] = _this.armor;
                _this.gear[2] = _this.boots;
                _this.gear[3] = _this.gloves;
                _this.gear[4] = _this.shovel;
            })();
			_this.tier = _this.armor.tier;
        }
        else
            throw new Error('invalid overload');
    }
	    Inv.prototype.getGear = function () {
        return this.gear;
    };
	    Inv.prototype.getTier = function () {
        return this.tier;
    };
	
	    Inv.prototype.getGold = function () {
        return this.gold;
    };
	
	    Inv.prototype.setGold = function (gold) {
        this.gold = gold;
    };
    Inv.prototype.setTier = function (tierr) {
        this.gloves.tier = tierr;
		this.headGear.tier = tierr;
		this.boots.tier = tierr;
		this.armor.tier = tierr;
		this.shovel.tier = tierr;
		this.tier = tierr;
    };
	Inv.prototype.getSpeed = function () {
		var speed = 0;
		speed = speed + this.boots.tier;
		speed = speed + this.headGear.tier;
		speed = speed + this.armor.tier;
		speed = speed + this.gloves.tier;
        return speed;
    };
    return Inv;
}());
Inv["__class"] = "Inv";

var Item = (function () {
    function Item(tier, name, price, amount) {
        var _this = this;
        this.amount = -1;
        if (((typeof tier === 'number') || tier === null) && ((typeof name === 'string') || name === null) && ((typeof price === 'number') || price === null) && ((typeof amount === 'number') || amount === null)) {
            var __args = Array.prototype.slice.call(arguments);
            this.tier = 0;
            this.name = null;
            this.price = 0;
            this.effect = 0;
            this.amount = -1;
            this.tier = 0;
            this.name = null;
            this.price = 0;
            this.effect = 0;
            (function () {
                _this.tier = tier;
                _this.name = name;
                _this.price = price;
                _this.effect = tier;
                _this.amount = amount;
            })();
        }
        else if (((typeof tier === 'number') || tier === null) && ((typeof name === 'string') || name === null) && ((typeof price === 'number') || price === null) && amount === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            this.tier = 0;
            this.name = null;
            this.price = 0;
            this.effect = 0;
            this.amount = -1;
            this.tier = 0;
            this.name = null;
            this.price = 0;
            this.effect = 0;
            (function () {
                _this.tier = tier;
                _this.name = name;
                _this.price = price;
                _this.effect = tier;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    return Item;
}());
Item["__class"] = "Item";