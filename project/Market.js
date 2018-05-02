/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
Market = (function () {
    function Market(items) {
        var _this = this;
        if (((items != null && items instanceof Array && (items.length == 0 || items[0] == null || (items[0] != null && items[0] instanceof Item))) || items === null)) {
            var __args = Array.prototype.slice.call(arguments);
            this.items = null;
            this.items = null;
            (function () {
                _this.items = items;
            })();
        }
        else if (items === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            this.items = new Array();
            (function () {
                _this.items[0] = new Item(1, "head", 100, 10);
                _this.items[1] = new Item(1, "armor", 100, 10);
                _this.items[2] = new Item(1, "boots", 100, 10);
                _this.items[3] = new Item(1, "gloves", 100, 10);
                _this.items[4] = new Item(1, "shovel", 100, 10);
                _this.items[5] = new Item(2, "head", 10000, 10);
                _this.items[6] = new Item(2, "armor", 10000, 10);
                _this.items[7] = new Item(2, "boots", 10000, 10);
                _this.items[8] = new Item(2, "gloves", 10000, 10);
                _this.items[9] = new Item(2, "shovel", 10000, 10);
				 _this.items[10] = new Item(3, "head", 100000, 10);
                _this.items[11] = new Item(3, "armor", 100000, 10);
                _this.items[12] = new Item(3, "boots", 100000, 10);
                _this.items[13] = new Item(3, "gloves", 100000, 10);
                _this.items[14] = new Item(3, "shovel", 100000, 10);
            })();
        }
        else
            throw new Error('invalid overload');
    }
    Market.prototype.sell = function (player) {
    };
    Market.prototype.buy = function (player) {
    };
    return Market;
}());
Market["__class"] = "Market";
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
