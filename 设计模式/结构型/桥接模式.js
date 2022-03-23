/**
 * 桥接模式：分离关联（依赖）的类，使其独立变化
 */
class Color {
  constructor(name) {
    this.name = name;
  }
}

class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  draw() {
    console.log(`The shape ${this.name} has color ${this.color.name}.`);
  }
}

const red = new Color("red");
const shape = new Shape("Rectangle", red);
shape.draw();
