/**
 * 工厂模式：定义创建对象的接口，将类的实例化延迟到子类中
 *
 * 适用：在根据具体环境创建不同的实例，
 */
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Factory {
  create(name) {
    return new Product(name);
  }
}

const factory = new Factory();

const product = factory.create("产品");

console.log(product.getName());
