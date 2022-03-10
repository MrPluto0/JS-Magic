function clone(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

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

clone(Parent, Child);

let instance1 = new Child();
let instance2 = new Child();

instance1.play.push(5);

// 数据独立
console.log(instance1.play);
console.log(instance2.play);

// 可访问寄生链上的内容
console.log(instance1.getName());
