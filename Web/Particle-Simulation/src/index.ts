import App from "./App.js";
import Particle from "./Particle.js";
import Vec2 from "./Vec2.js";

const app = new App({
  canvasEl: document.getElementById("canvas") as HTMLCanvasElement,
  fieldSize: 100
});

// idk

// Add sands
// for (let y = 0; y < 45; y += 5) {
//   for (let x = ((y/2)%5)*5-10; x < 100; x += 5) {
//     app.addParticle(new Particle({
//       x,
//       y,
//       color: "#e3a468",
//       friction: 10,
//       mass: 20,
//       size: 5,
//       threshold: 0,
//       velocity: new Vec2(0, 0),
//       elasticity: 1
//     }));
//   }
// }
// for (let y = 55; y < 100; y += 5) {
//   for (let x = ((y/2)%5)*5-10; x < 100; x += 5) {
//     app.addParticle(new Particle({
//       x,
//       y,
//       color: "#e3a468",
//       friction: 10,
//       mass: 20,
//       size: 5,
//       threshold: 0,
//       velocity: new Vec2(0, 0),
//       elasticity: 1
//     }));
//   }
// }
// app.addParticle(new Particle({
//   color: "#8aebdf",
//   friction: 100,
//   mass: 0.01,
//   size: 2,
//   threshold: 0.5,
//   velocity: new Vec2(50, Math.random()*5-2.5),
//   x: 0,
//   y: Math.random()*9+44,
//   elasticity: 1,
//   moved: true,
// }));

let lastTick = Date.now();
let spawnTime = 30;
function tick() {
  const now = Date.now();
  const dt = Math.min(20, now - lastTick);
  lastTick = now;

  // Spawn water
  spawnTime -= dt;
  if (spawnTime < 0) {
    spawnTime += 100;
    const rad = Math.random()*Math.PI*2;
    app.addParticle(new Particle({
      color: `hsl(${Math.random()*360}, 60%, 70%)`,
      friction: 3*Math.random(),
      mass: Math.random()*9,
      size: Math.random()*6+1,
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
