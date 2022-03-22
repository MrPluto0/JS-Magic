/**
 * 抽象工厂模式
 * 对工厂模式的再度封装，以支持注册和创建同一类型的产品
 */
class Car {
  static TYPE = "vehicle";

  constructor(options) {
    this.color = options?.color;
    this.speed = options?.speed;
  }
  desc() {
    console.log(`The car can run at speed of ${this.speed}.`);
  }
}

class Bus {
  static TYPE = "vehicle";

  constructor(options) {
    this.color = options?.color;
    this.capacity = options?.capacity;
  }
  desc() {
    console.log(`The bus can hold ${this.capacity} people.`);
  }
}

class AbstractFactory {
  constructor() {
    this.types = {};
  }
  register(type, vehicle) {
    if (vehicle?.TYPE === "vehicle") {
      this.types[type] = vehicle;
    }
    return this;
  }
  create(type, options) {
    const Vehicle = this.types[type];
    return Vehicle ? new Vehicle(options) : null;
  }
}

const af = new AbstractFactory();

af.register("car", Car);
af.register("bus", Bus);

const car = af.create("car", {
  color: "blue",
  speed: "120km/h",
});
car.desc();

const bus = af.create("bus", {
  color: "white",
  capacity: 55,
});
bus.desc();

const bike = af.create("bike", {});
console.log(bike);
