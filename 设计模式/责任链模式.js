/**
 * 责任链模式
 * 请求第一个条件，持续执行链上的函数，直到返回结果为止，
 * 例子：不同对象按顺序执行步骤
 */
class Action {
  constructor(act) {
    this.act = act;
    this.next = null;
  }

  setNextAction(action) {
    this.next = action;
  }

  handle() {
    this.act();
    if (this.next && this.next instanceof Action) {
      this.next.handle();
    }
  }
}

let a1 = new Action(() => {
  console.log("起床");
});

let a2 = new Action(() => {
  console.log("刷牙洗脸");
});

let a3 = new Action(() => {
  console.log("吃饭饭");
});

a1.setNextAction(a2);
a2.setNextAction(a3);

a1.handle();
