//父类
var BicycleShop = function () {};
BicycleShop.prototype = {
    constructor: BicycleShop,
    /**
     * @param {string} mode
     */
    buyBicycle: function (mode) {
        var bicycle = this.createBicycle(mode);
        bicycle.A();
        bicycle.B();
        return bicycle;
    },
    createBicycle: function(model) {
        throw new Error("需子类重写")
    }
}

//子类
var BicycleChild = function(name) {
    this.name = name;
    BicycleShop.call(this)
}

// 实现原型继承
function extend(Sub, Super) {
    var F = function() {};
    F.prototype = Super.prototype;
    Sub.prototype = new F();
    Sub.prototype.constructor = Sub;
    Sub.Super = Super.prototype;
    if(Super.prototype.constructor === Object.prototype.constructor) {
        Super.prototype.constructor = Super
    }
}

extend(BicycleChild,BicycleShop);

BicycleChild.prototype.createBicycle = function(){
    var A = function(){
        console.log("执行A业务操作");    
    };
    var B = function(){
        console.log("执行B业务操作");
    };
    return {
        A: A,
        B: B
    }
}

var childClass = new BicycleChild("大行");
console.log(childClass)