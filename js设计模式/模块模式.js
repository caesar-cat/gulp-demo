function CustomType() {
    this.name = "hq";
}

CustomType.prototype.getName = function() {
    return this.name;
}

var application = (function() {
    var privateA = "aa";

    var object = new CustomType()

    object.a = "aa"
    object.b = function() {
        return privateA;
    }
    return object
})