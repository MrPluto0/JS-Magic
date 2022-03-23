/**
 * 外观模式：为一组接口提供一个一致的界面
 */

// 兼容浏览器事件绑定
const addEventListener = function (el, evt, fn) {
  if (el.addEventListener) {
    el.addEventListener(evt, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + evt, fn);
  } else {
    el["on" + evt] = fn;
  }
};
