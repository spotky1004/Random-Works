const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const eles = {
  levelContainer: document.getElementById("level-container"),
  point: document.getElementById("point"),
  clickBoostFactor: document.getElementById("click-boost-factor"),
}

function updateCanvas() {
  const [w, h] = [innerWidth, innerHeight];
  const m = Math.min(w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.globalAlpha = 1;

  ctx.clearRect(0, 0, w, h);

  // Circle
  ctx.beginPath();
  ctx.fillStyle = "#fcccfb";
  ctx.arc(w/2, h/2, m/2, 0, 2*Math.PI);
  ctx.fill();

  // Clock
  for (let i = 0; i < game.clockUnlocked; i++) {
    let deg = (1 - game.clockProgresses[i]) * 2 * Math.PI;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${300-300/game.maxClock*i}, 50%, 70%)`;
    ctx.moveTo(w/2, h/2);
    ctx.arc(w/2, h/2, m/2, -Math.PI/2, deg-Math.PI/2);
    ctx.fill();
  }

  let clockStats = getClockStats(game.clockUnlocked);
  for (let i = 0; i < game.clockUnlocked; i++) {
    let maxProgress = clockStats[i].maxProgress;
    if (maxProgress <= 0) continue;
    let maxProgressDeg = maxProgress * 2 * Math.PI;

    ctx.strokeStyle = `hsl(${300-300/game.maxClock*i}, 50%, 60%)`;
    ctx.lineWidth = m/500;
    ctx.globalAlpha = Math.max(0.2, 10/game.maxClock);
    ctx.beginPath();
    ctx.moveTo(
      w/2 + m*Math.sin(maxProgressDeg)/2,
      h/2 - m*Math.cos(maxProgressDeg)/2
    );
    ctx.lineTo(w/2, h/2);
    ctx.stroke();

    prevMaxProgress = maxProgress;
  }
}

function getClockStats(to) {
  /**
   * @typedef ClockStats
   * @property {number} maxProgress
   * @property {number} speed
   */
  /** @type {ClockStats[]} */
  let stats = [];
  let prevMaxProgress;
  let divFactor = Array.from({ length: to }, (_, i) => i+1).reduce((a, b) => a*b, 1);
  for (let i = 0; i < to; i++) {
    const maxProgress = (prevMaxProgress ?? 1) * 0.75**(game.clockProgressUpgrades[i]+1)
    stats.push({
      maxProgress,
      speed: 1/10 * game.clickBoost / divFactor
    });
    prevMaxProgress = maxProgress;
    divFactor /= to-i;
  }

  stats[to-1].maxProgress = 0;
  return stats;
}

let game = {
  lastTick: new Date().getTime(),
  clickBoost: 1,
  clockProgresses: new Array(100).fill(0),
  clockProgressUpgrades: new Array(100).fill(0),
  clockUnlocked: 5,
  maxClock: 10,
  point: 0
};
function update() {
  let timeNow = new Date().getTime();
  let dt = timeNow - game.lastTick;
  dt = Math.min(60*1000, dt);
  game.lastTick = timeNow;

  game.clickBoost = 1 + ((game.clickBoost - 1) * 0.8**(dt/1000));

  const clockStats = getClockStats(game.clockUnlocked);
  for (let i = 0; i < game.clockUnlocked; i++) {
    let clockStat = clockStats[i];

    game.clockProgresses[i] += dt*clockStat.speed/1000;
    game.point += Math.floor(game.clockProgresses[i]/(1-clockStat.maxProgress));
    if (game.clockProgresses[i] > (1-clockStat.maxProgress)) {
      if (i !== 0) {
        game.clockProgresses[i] = game.clockProgresses[i-1];
      } else {
        game.clockProgresses[i] = 0;
      }
    }
  }

  eles.point.innerText = game.point;

  eles.clickBoostFactor.innerText = `x${game.clickBoost.toFixed(2)}`;
  eles.clickBoostFactor.style.fontSize = `${game.clickBoost}em`;
  eles.clickBoostFactor.style.opacity = Math.min(1, 0.2 + game.clickBoost/5);

  updateCanvas();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

document.addEventListener("click", function() {
  game.clickBoost += 0.1;
});
