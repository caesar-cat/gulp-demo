var Interview = function() {};

Interview.prototype.writtenTest = function() {
    console.log("笔试")
}

Interview.prototype.technicalInterview  = function() {
    console.log("技术面试")
}

Interview.prototype.leader = function() {
    console.log("leader面试")
}

Interview.prototype.waitNotice = function() {
    console.log("等通知")
}

Interview.prototype.init = function() {
    this.writtenTest();

    this.technicalInterview();

    this.leader();

    this.waitNotice();
}

var BaiduInterview = function() {}

BaiduInterview.prototype = new Interview()

BaiduInterview.prototype.writtenTest = function() {
    console.log("百度笔试")
}

BaiduInterview.prototype.technicalInterview  = function() {
    console.log("技术面试")
}

BaiduInterview.prototype.leader = function() {
    console.log("leader面试")
}

BaiduInterview.prototype.waitNotice = function() {
    console.log("等通知")
}

var baiDuInterview = new BaiDuInterview();

baiDuInterview.init();
