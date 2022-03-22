/**
 * 建造者模式：构建一个包含多个组成部件的对象
 * 角色：建造者（接口），具体建造者，产品，指挥
 */

class Computer {
  #CPU;
  #Memory;
  #Disk;
  constructor() {
    this.#CPU = null;
    this.#Memory = null;
    this.#Disk = null;
  }
  setCPU(cpu) {
    this.#CPU = cpu;
  }
  setMemory(memory) {
    this.#Memory = memory;
  }
  setDisk(disk) {
    this.#Disk = disk;
  }
  desc() {
    console.log(`CPU:${this.#CPU}, Memory:${this.#Memory}, Disk:${this.#Disk}`);
  }
}

// Interface Builder
class IBuilder {
  createCPU() {}
  createMemory() {}
  createDisk() {}
  createComputer() {}
}

// Builder implements IBuilder
class Builder extends IBuilder {
  computer;
  constructor() {
    super();
    this.computer = new Computer();
  }

  createCPU(cpu) {
    this.computer.setCPU(cpu);
  }
  createMemory(memory) {
    this.computer.setMemory(memory);
  }
  createDisk(disk) {
    this.computer.setDisk(disk);
  }
  createComputer() {
    return this.computer;
  }
}

class Director {
  builder;
  constructor(builder) {
    this.builder = builder;
  }
  createComputer(cpu, memory, disk) {
    this.builder.createCPU(cpu);
    this.builder.createMemory(memory);
    this.builder.createDisk(disk);
    return this.builder.createComputer();
  }
}

const worker = new Builder();
const boss = new Director(worker);
const computer = boss.createComputer("Intel i7", "金士顿", "西部数据");
computer.desc();
