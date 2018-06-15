var event = {
    list: [],
    listen: function(key, fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },

    trigger: function() {
        var key = Array.prototype.shift.call(arguments);
        var fns = this.list[key];
        if(!fns || fns.length === 0) {
            return;
        }
        for(var i = 0, fn; i < fns.length; fn = fns[i++]) {
            fn.apply(this, arguments)
        }
    },

    remove: function(key, fn) {
        var fns = this.list[key];
        if(!fns) {
            return false
        }
        if(!fn) {
            fns.length = 0
        }else {
            for(var i = 0; i<fns.length; i++) {
                var _fn = fns[i];
                if(_fn === fns) {
                    fns.splice(i, 1)
                }
            }
        }
    }
}

var initEvent = function(obj) {
    for(var i in event) {
        obj[i] = event[i]
    }
}

var shoeObj = {};
initEvent(shoeObj);