/**
 * 装饰者模式：动态地给函数赋能
 * AOP --- Aspect Oriented Programming，面向切面编程
 * 通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术。
 */

// 前置代码
Function.prototype.before = function (fn) {
  const self = this;
  return function () {
    fn.apply(this, arguments);
    return self.apply(this, arguments); // 思考此处this和self的区别
  };
};

// 后置代码
Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    self.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

const wear1 = function () {
  console.log("穿上第一件衣服");
};

const wear2 = function () {
  console.log("穿上第二件衣服");
};

const wear3 = function () {
  console.log("穿上第三件衣服");
};

const wear = wear1.after(wear2).after(wear3);
wear();
