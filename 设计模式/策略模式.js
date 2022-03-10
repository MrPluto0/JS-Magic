/**
 * 策略模式：根据不同参数执行不同的策略
 * 如：设计命令
 */
function addUser() {
  console.log("add user");
}
function addLeader() {
  console.log("add leader");
}
function modifyUsername() {
  console.log("modify username");
}
function modifyPassword() {
  console.log("modify password");
}
function delUser() {
  console.log("del user");
}
function delLeader() {
  console.log("del leader");
}

const Command = {
  add: {
    user: addUser,
    leader: addLeader,
  },
  modify: {
    username: modifyUsername,
    password: modifyPassword,
  },
  del: {
    user: delUser,
    leader: delLeader,
  },
};

const RunCommand = function (action, target) {
  Command[action][target]();
};

RunCommand("add", "user");
RunCommand("modify", "password");
