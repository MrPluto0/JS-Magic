/**
 * 发布-订阅模式
 * 经典的例子：document.addListener( eventName，eventFunction);
 */

class Emitter {
  _events;

  constructor() {
    this._events = {};
  }

  on(name, callback) {
    if (!this._events[name]) this._events[name] = [];
    this._events[name].push(callback);
  }

  emit(name, ...args) {
    if (!this._events[name]) return;

    this._events[name].forEach((event) => {
      event(...args);
    });
  }

  revoke(name, callback) {
    if (!this._events[name]) return;

    this._events[name] = this._events[name].filter(
      (event) => event !== callback
    );
  }
}

const bus = new Emitter();

const cb = () => {
  console.log("revoke test event");
};

bus.on("test", () => {
  console.log("invoke test event1");
});

bus.on("test", () => {
  console.log("invoke test event2");
});

bus.on("test", cb);

bus.emit("test");

bus.revoke("test", cb);

bus.emit("test");
