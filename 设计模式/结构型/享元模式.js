/**
 * 享元模式
 * 优化程序性能的模式。本质上**减少对象创建的个数**
 * 如：下面模特试衣服的例子，结合使用 工厂模式，享元模式
 */

class Model {
  constructor(name, clothes) {
    this.name = name;
    this.clothes = clothes;
  }

  wearClothes(clothes) {
    this.clothes = clothes;
  }

  takePhoto() {
    console.log(`模特${this.name}穿着衣服${this.clothes}`);
  }
}

class ModelFactory {
  constructor() {
    this.models = {};
  }

  createModel(name) {
    if (!this.models[name]) {
      this.models[name] = new Model(name);
    }
    return this.models[name];
  }
}

class ModelManager {
  constructor() {
    this.clothes = {};
    this.models = new ModelFactory();
  }

  add(modelName, i) {
    if (!this.clothes[i]) this.clothes[i] = `第${i}款衣服`;

    const model = this.models.createModel(modelName);
    model.wearClothes(this.clothes[i]);

    return model;
  }
}

const manager = new ModelManager();

for (let i = 0; i < 20; i++) {
  const model = manager.add("male", i);
  model.takePhoto();
}

for (let i = 0; i < 20; i++) {
  const model = manager.add("female", i);
  model.takePhoto();
}
