function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3, 4];
}

function Child() {
  this.type = "child";
}

Child.prototype = new Parent();

let instance1 = new Child();
let instance2 = new Child();

instance1.play.push(5);

// 数据共享
console.log(instance1.play);
console.log(instance2.play);
