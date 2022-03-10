/**
 * 模板方法模式：
 * 在父类中实现好一个基本确定的执行流程
 * 子类中可直接使用或部分重写执行
 */
class Drinks {
  constructor() {}

  firstStep() {
    console.log("烧开水");
  }

  secondStep() {
    console.log("第二步");
  }

  thirdStep() {
    console.log("倒入杯子");
  }

  forthStep() {
    console.log("第四步");
  }

  forthHook() {
    return true;
  }

  execute() {
    this.firstStep();
    this.secondStep();
    this.thirdStep();

    if (this.forthHook()) {
      this.forthStep();
    }
  }
}

class Tea extends Drinks {
  constructor() {
    super();
  }

  secondStep() {
    console.log("浸泡茶叶");
  }

  // 钩子绑定步骤
  forthStep() {
    console.log("放入柠檬");
  }

  forthHook() {
    return false;
  }
}

const tea = new Tea();
tea.execute();
