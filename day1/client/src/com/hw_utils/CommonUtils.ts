//todo 新的打包方式不支持全局函数,这个trace仅仅定义一个全局名字,真实方法是laya.core.js中实现的.后面再研究一下
var trace = function (...arg): void {
    console.log.apply(this, arg);
}

// var sleep = (sleeptime) => {
//     return new Promise((resolve) => {
//         Laya.timer.once(sleeptime, this, resolve);
//     });
// }
// var error = function (...arg): void {
//     console.error.apply(this, arg);
// }

// var warn = function (...arg): void {
//     console.warn.apply(this, arg);
// }

// var _loglist: any[];
// var _logtext: Laya.Text;
// var toscreen = function (arg): void {
//     console.warn("1vvvvv")
//     var str: string = arg.join(",");
//     if (_loglist.length < 40) {
//         _loglist.push(str);
//         return;
//     }
//     if (_logtext == null) {
//         _logtext = new Laya.Text();
//         _logtext.color = "#000000";
//         _logtext.stroke = 2;
//         _logtext.borderColor = "#ffffff";
//         _logtext.mouseEnabled = false;
//         Laya.stage.addChild(_logtext);
//         _logtext.width = Laya.stage.width;
//         _logtext.height = Laya.stage.height;
//         _logtext.alpha = 0.4;
//     }
//     _logtext.text = _loglist.join("\n");
//     _loglist = [];
// }
