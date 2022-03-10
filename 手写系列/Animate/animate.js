const RUNNING = 0;
const PAUSED = 1;

function animate({ easing, draw, duration, reverse = false, speed = 1 }) {
  let interval = 0; // log the interval of start and paused time
  let start;
  let rafId;
  let state = RUNNING;
  return {
    play() {
      state = RUNNING;
      // restore the start time
      start = performance.now() - interval;
      interval = 0;
      return new Promise((resolve) => {
        rafId = requestAnimationFrame(function step() {
          let now = performance.now();
          let timeFrac = (now - start) / duration;
          // control the speed
          timeFrac *= speed;
          if (timeFrac > 1) timeFrac = 1;

          // judge if reversed
          let progress;
          if (!reverse) {
            progress = easing(timeFrac);
          } else {
            progress = easing(1 - timeFrac);
          }
          draw(progress);

          // recursive run step
          if (timeFrac < 1) rafId = requestAnimationFrame(step);
          else resolve();
        });
      });
    },
    pause() {
      state = PAUSED;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        interval = performance.now() - start;
      }
    },
    cancel() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        let progress = easing(0);
        draw(0);
      }
    },
    reverse(flag = true) {
      reverse = flag;
    },
    playState(sp) {
      if (sp <= 0) return;
      speed = sp;
    },
  };
}

// test

const ball = document.getElementById("ball");

const animation = animate({
  duration: 5000,
  draw(progress) {
    ball.style.transform = `translate(${progress}px,0)`;
  },
  easing(timeFrac) {
    return timeFrac * 200;
  },
});

animation.playState(2);
animation.reverse();
animation.play();
