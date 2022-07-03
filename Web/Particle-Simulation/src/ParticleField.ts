import type Particle from "./Particle";

const HITBOX_MULT = 0.85;

export default class ParticleField {
  readonly particles: Particle[] = [];
  size: number;
  
  constructor(size: number) {
    this.size = size;
  }

  addParticle(particle: Particle) {
    this.particles.push(particle);
  }

  removeParticle(particle: Particle) {
    const idx = this.particles.indexOf(particle);
    if (idx !== -1) {
      this.particles.splice(idx, 1);
    }
  }

  tick(dt: number) {
    for (const particle of this.particles) {
      if (
        (0 > particle.x || particle.x > this.size) ||
        (0 > particle.y || particle.y > this.size)
      ) {
        this.removeParticle(particle);
        continue;
      }
      particle.tick(dt);
    }

    for (const p1 of this.particles) {
      for (const p2 of this.particles) {
        if (p1 === p2) continue;
        const isCollision = p1.isCollisionWith(p2, HITBOX_MULT);
        if (!isCollision) continue;
        const [p1v, p2v] = p1.calcCollisionSpeed(p2);
        if (p1.threshold < p2.mass * p2.velocity.getSize()) p1.velocity = p1v;
        if (p2.threshold < p1.mass * p1.velocity.getSize()) p2.velocity = p2v;
        
        const theta = p1.getThetaWith(p2);
        const l = (p1.size/2 + p2.size/2) * HITBOX_MULT;
        // asdf
        if (p1.moved) {
          p1.x = p2.x + l * Math.cos(theta);
          p1.y = p2.y + l * Math.sin(theta);
        } else if (p2.moved) {
          p2.x = p1.x - l * Math.cos(theta);
          p2.y = p1.y - l * Math.sin(theta);
        } else {
          
        }
      }
    }
  }
}
