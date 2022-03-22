/**
 * 观察者模式：定义一对多关系，多个观察者对象同时监听一个对象主体
 */

class Subject {
  constructor() {
    this.observers = [];
    this.state = 0;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyObservers();
  }

  notifyObservers() {
    this.observers.forEach((observe) => {
      observe.update();
    });
  }

  attach(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }

  update() {
    console.log(
      "对象%s监听到主体状态变更：%d",
      this.name,
      this.subject.getState()
    );
  }
}

let s = new Subject();

let o1 = new Observer("o1", s);
let o2 = new Observer("o2", s);

s.setState(1);
