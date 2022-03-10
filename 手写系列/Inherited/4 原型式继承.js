let parent = {
  name: "parent",
  play: [1, 2, 3, 4],
  getName: function () {
    return this.name;
  },
};

let child1 = Object.create(parent);
child1.type = "child1";

let child2 = Object.create(parent);
child2.type = "child2";

// 数据不独立
child1.play.push(5);

console.log(child1.play);
console.log(child2.play);

// 可访问parent的原型链上的方法
console.log(child1.getName());

// 下面的方法可独立变量
// function Parent() {
//   this.name = "parent";
//   this.play = [1, 2, 3, 4];
// }

// Parent.prototype.getName = function () {
//   return this.name;
// };

// let child1 = Object.create(new Parent());
// child1.type = "child1";

// let child2 = Object.create(new Parent());
// child2.type = "child2";

// // 数据独立
// child1.play.push(5);

// console.log(child1.play);
// console.log(child2.play);

// // 可访问parent的原型链上的方法
// console.log(child1.getName());
