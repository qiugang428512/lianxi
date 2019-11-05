/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.html.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.particle.js")
loadLib("libs/other/jszip.min.js")
loadLib("libs/other/fairygui.js")
loadLib("libs/other/mpsdk.min.js")
loadLib("libs/other/sprintf.js")
//-----libs-end-------
loadLib("js/bundle.js");
