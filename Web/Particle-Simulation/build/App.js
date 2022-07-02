import ParticleField from "./ParticleField.js";
import Canvas from "./Canvas.js";
export default class App {
    constructor(options) {
        this.canvas = new Canvas({
            canvasEl: options.canvasEl,
            size: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            camera: {
                x: 0,
                y: 0,
                zoom: 1 / options.fieldSize
            }
        });
        this.particleField = new ParticleField(options.fieldSize);
    }
    tick(dt) {
        this.particleField.tick(dt);
        this.render();
    }
    addParticle(particle) {
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
            canvas.fillCircle(particle.x, particle.y, particle.size / 2);
        }
        canvas.render();
    }
}
