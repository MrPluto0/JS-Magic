/**
 * 组合模式：基本对象和组合对象要一致对待
 * 如：文件夹与文件
 */
class Folder {
  constructor(name) {
    this.name = name;
    this.list = [];
  }

  add(resource) {
    this.list.push(resource);
  }

  // DFS 扫描
  scan() {
    console.log("开始扫描文件夹%s", this.name);
    this.list.forEach((resource) => {
      resource.scan();
    });
  }
}

class File {
  constructor(name) {
    this.name = name;
  }

  add() {
    console.error("文件下不能添加资源");
  }

  scan() {
    console.log("开始扫描文件%s", this.name);
  }
}

const design = new Folder("设计模式");
design.add(new File("组合模式"));
design.add(new File("命令模式"));

const learn = new Folder("基础学习");
learn.add(new File("变量类型"));
learn.add(new File("函数"));

const JS = new Folder("JavaScript");
JS.add(learn);
JS.add(design);

JS.scan();
