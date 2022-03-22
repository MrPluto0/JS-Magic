/**
 * 中介者模式
 * 对象与对象借助第三方中介者进行通信
 */

const PlayerMiddle = (function () {
  let players = [];
  let winPlayers = [];
  let losePlayers = [];
  return {
    add(player) {
      players.push(player);
    },
    win(player) {
      winPlayers.push(player);
    },
    lose(player) {
      losePlayers.push(player);
    },
    show() {
      winPlayers.forEach((wp) => {
        console.log("%s胜利", wp.name);
      });
      losePlayers.forEach((lp) => {
        console.log("%s失败", lp.name);
      });
    },
  };
})();

class Player {
  constructor(name) {
    this.name = name;
    PlayerMiddle.add(this);
  }

  win() {
    PlayerMiddle.win(this);
  }

  lose() {
    PlayerMiddle.lose(this);
  }
}

const a = new Player("选手A");
const b = new Player("选手B");
const c = new Player("选手C");

a.win();
b.lose();
c.lose();

PlayerMiddle.show();
