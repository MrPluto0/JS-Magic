function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3, 4];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  this.type = "child";
  Parent.call(this);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let instance1 = new Child();
let instance2 = new Child();

instance1.play.push(5);

// 数据独立
console.log(instance1.play);
console.log(instance2.play);

// 且访问parent的原型链上的方法
console.log(instance1.getName());
