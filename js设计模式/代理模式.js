//使用代理对象在内部实例化
var Girl = function(name) {
    this.name = name
};

var Ceo = function(girl) {
    this.girl = girl;
    this.sendGift = function(gift) {
        console.log("Hi" + this.girl.name +", "强强送你礼物:" + gift);
    }
}

var Proxy = function(girl) {
    this.girl = girl
    this.sendGift = function(gift) {
        (new Ceo(this.girl)).sendGift(gift)
    }
}

var proxy = new Proxy(new Girl("文文"));
proxy.sendGift("结婚戒")

//图片预加载
var myImage = (function() {
    var imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})()

var ProxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function(src) {
            myImage.setSrc("initSrc");
            img.src = src
        }
    }
})()

ProxyImage.setSrc('newSrc')
