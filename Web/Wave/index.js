/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WAVE_COUNT = 40;
const waveShifts = new Array(WAVE_COUNT).fill().map((_, i) => Math.random()*Math.PI*2);
const waveSpeeds = new Array(WAVE_COUNT).fill().map((_, i) => 2*(i+1)*Math.random());
const waveWeights = new Array(WAVE_COUNT).fill().map((_, i) => (i+1)/WAVE_COUNT**2);

function update() {
  let { innerWidth: WIDTH, innerHeight: HEIGHT } = window;
  if (WIDTH !== canvas.width || HEIGHT !== canvas.height) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
  }

  const t = window.performance.now();

  const wave = new Array(WIDTH).fill(0);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < WAVE_COUNT; i++) {
    const v = waveSpeeds[i];
    const a = waveWeights[i];
    const p = waveShifts[i];
    for (let x = 0; x < WIDTH; x++) {
      const value = a*Math.sin(p+(v*x+6*t)/1000)**3;
      wave[x] += value;
    }
  }

  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  for (let i = 0; i < wave.length; i++) {
    ctx.lineTo(i*(1+1/wave.length), HEIGHT/2 - wave[i]*HEIGHT/8);
  }
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.moveTo(0, HEIGHT);
  const grd = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  grd.addColorStop(0.4, `hsl(${t/100}, 60%, 50%)`);
  grd.addColorStop(1, `hsl(${t/100}, 60%, 80%)`);
  ctx.fillStyle = grd;
  ctx.fill();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
