/**
 * 命令模式 / 动作模式 / 事务模式
 * 将 触发者、传递者 和 执行者 松解耦
 */
class Receiver {
  execute() {
    console.log("接收者执行命令");
  }
}

class Command {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {
    console.log("传递着传递命令");
    this.receiver.execute();
  }
}

class Invoker {
  constructor(command) {
    this.command = command;
  }

  invoke() {
    console.log("发送者触发命令");
    this.command.execute();
  }
}

const clickCallback = new Receiver();

const click = new Command(clickCallback);

const button = new Invoker(click);

console.log("点击按钮");
button.invoke();
