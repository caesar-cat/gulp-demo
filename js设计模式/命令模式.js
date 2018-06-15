var b1 = document.getElementById("button1"),
    b2 = document.getElementById("button2"),
    b3 = document.getElementById("button3"),
    b4 = document.getElementById("button4");
/*
 bindEnv函数负责往按钮上面安装点击命令。点击按钮后，会调用
 函数
 */
var bindEnv = function(button,func) {
    button.onclick = function(){
        func();
    }
};
// 现在我们来编写具体处理业务逻辑代码
var Todo1 = {
    test1: function(){
        alert("我是来做第一个测试的");
    }    
};
// 实现业务中的增删改操作
var Menu = {
    add: function(){
        alert("我是来处理一些增加操作的");
    },
    del: function(){
        alert("我是来处理一些删除操作的");
    },
    update: function(){
        alert("我是来处理一些更新操作的");
    }
};
// 调用函数
bindEnv(b1,Todo1.test1);
// 增加按钮
bindEnv(b2,Menu.add);
// 删除按钮
bindEnv(b3,Menu.del);
// 更改按钮
bindEnv(b4,Menu.update);