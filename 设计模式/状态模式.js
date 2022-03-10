/**
 * 状态模式
 * 将事物内部的每个状态分别封装成类，内部状态改变会产生不同行为
 */

// context表示当前环境
const context = (function () {
  let state = null;
  return {
    getState() {
      return state;
    },
    setState(s) {
      console.log("灯%s了", s);
      state = s;
    },
  };
})();

class State {
  constructor(name) {
    this.name = name;
  }
  handle(context) {
    context.setState(this.name);
  }
}

const light = new State("亮");
const weak = new State("暗");
const off = new State("灭");

light.handle(context);
weak.handle(context);
off.handle(context);
