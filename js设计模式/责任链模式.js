//同步责任链
function order100(orderType, isPay, count) {
    if(orderType === 1) {
        console.log("恭喜你获得100元红包")
    }else {
        return 'next'
    }
}

function order20(orderType, isPay, count) {
    if(orderType === 2) {
        console.log("恭喜你获得20元红包")
    }else {
        return 'next'
    }
}

function orderNormal(orderType, isPay, count) {
    if(orderType === 3 && count > 0) {
        console.log("恭喜你获得10元红包")
    }else {
        console.log("谢谢惠顾，再接再厉！")
    }
}

var Chain = function(fn) {
    this.fn = fn;
    this.successor = null
}

Chain.prototype = {
    setNextSuccessor: function(successor) {
        return this.successor = successor
    },

    passRequest: function() {
        var ret = this.fn.apply(this, arguments);
        if(ret === "next") {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret
    },

    next: function() {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
}

var chainOrder100 = new Chain(order100)
var chainOrder20 = new Chain(order20)
var chainOrderNormal = new Chain(orderNormal)

chainOrder100.setNextSuccessor(chainOrder20)
chainOrder20.setNextSuccessor(chainOrderNormal)

chainOrder100.passRequest(1, true , 500)
chainOrder20.passRequest(2, true, 500)
chainOrderNormal.passRequest(3, true, 500)
chainOrderNormal.passRequest(3, true, 0)


//异步责任链模式
function Fn1() {
    console.log(1);
    return "nextSuccessor";
}

function Fn2() {
    console.log(2);
    var self = this;
    setTimeout(() => {
        self.next()
    }, 1000);
}

function Fn3() {
    console.log(3);
}

var chainFn1 = new Chain(Fn1);
var chainFn2 = new Chain(Fn2);
var chainFn3 = new Chain(Fn3);

chainFn1.setNextSuccessor(chainFn2);
chainFn2.setNextSuccessor(chainFn3);

chainFn1.passRequest();   // 打印出1，2 过1秒后 会打印出3

