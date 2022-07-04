import App from "./App.js";
import Particle from "./Particle.js";
import Vec2 from "./Vec2.js";

const app = new App({
  canvasEl: document.getElementById("canvas") as HTMLCanvasElement,
  fieldSize: 100
});

let lastTick = Date.now();
let spawnTime = 30;
function tick() {
  const now = Date.now();
  const dt = Math.min(20, now - lastTick);
  lastTick = now;

  // Spawn random particle
  spawnTime -= dt;
  if (spawnTime < 0) {
    spawnTime += 100;
    const rad = Math.random()*Math.PI*2;
    const mass = Math.random()*36;
    app.addParticle(new Particle({
      color: `hsl(${Math.random()*360}, 60%, 70%)`,
      friction: 3*Math.random(),
      mass: mass,
      size: Math.sqrt(mass),
      threshold: 0,
      velocity: new Vec2(40*Math.random()*Math.cos(rad+Math.PI), 40*Math.random()*Math.sin(rad+Math.PI)),
      x: 50*Math.cos(rad)+50,
      y: 50*Math.sin(rad)+50,
      elasticity: 1,
      moved: true,
    }));
  }

  app.tick(dt);
  requestAnimationFrame(tick);
}
tick();
