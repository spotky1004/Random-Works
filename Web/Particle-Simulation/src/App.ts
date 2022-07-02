import ParticleField from "./ParticleField.js";
import Canvas from "./Canvas.js";
import type Particle from "./Particle";

interface AppOptions {
  canvasEl: HTMLCanvasElement;
  fieldSize: number;
}

export default class App {
  private readonly canvas: Canvas;
  readonly particleField: ParticleField;

  constructor(options: AppOptions) {
    this.canvas = new Canvas({
      canvasEl: options.canvasEl,
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      camera: {
        x: 0,
        y: 0,
        zoom: 1/options.fieldSize
      }
    });
    this.particleField = new ParticleField(options.fieldSize);
  }

  tick(dt: number) {
    this.particleField.tick(dt);
    this.render();
  }

  addParticle(particle: Particle) {
    this.particleField.addParticle(particle);
  }

  render() {
    const canvas = this.canvas;
    const particles = this.particleField.particles;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.fillStyle = "#222";
    canvas.clearRect();
    for (const particle of particles) {
      canvas.fillStyle = particle.color;
      canvas.fillCircle(particle.x, particle.y, particle.size/2);
    }
    canvas.render();
  }
}
