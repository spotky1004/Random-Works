import Vec2 from "./Vec2.js";
export default class Particle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.mass = options.mass;
        this.velocity = options.velocity;
        this.threshold = options.threshold;
        this.friction = options.friction;
        this.elasticity = options.elasticity ?? 1;
        this.color = options.color;
        this.size = options.size;
        this.moved = options.moved ?? false;
    }
    tick(dt) {
        const v1 = this.velocity;
        const v2 = this.velocity.sub(this.friction * dt / 1000);
        if ((v1.x === 0 && v1.y === 0) ||
            Math.abs(v1.getRad() - v2.getRad()) > 1) {
            this.velocity = new Vec2(0, 0);
        }
        else {
            this.velocity = v2;
        }
        const { x: vx, y: vy } = this.velocity;
        this.x += vx * dt / 1000;
        this.y += vy * dt / 1000;
    }
    getThetaWith(particle) {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = particle;
        const theta = (Math.PI * 2 + Math.atan2(y1 - y2, x1 - x2)) % (Math.PI * 2);
        return theta;
    }
    calcCollisionSpeed(particle) {
        // http://egloos.zum.com/hhugs/v/3506086
        const { velocity: { x: v1x, y: v1y }, mass: m1, elasticity: e1 } = this;
        const { velocity: { x: v2x, y: v2y }, mass: m2, elasticity: e2 } = particle;
        const theta = this.getThetaWith(particle);
        const sint = Math.sin(theta);
        const cost = Math.cos(theta);
        const v1xp = (m1 - e1 * m2) / (m1 + m2) * (v1x * cost + v1y * sint) + (m2 + e1 * m2) / (m1 + m2) * (v2x - cost + v2y * sint);
        const v2xp = (m1 + e2 * m1) / (m1 + m2) * (v1x * cost + v1y * sint) + (m2 - e2 * m1) / (m1 + m2) * (v2x * cost + v2y * sint);
        const v1yp = v1y * cost - v1x * sint;
        const v2yp = v2y * cost - v2x * sint;
        const v1xp2 = v1xp * cost - v1yp * sint;
        const v1yp2 = v1xp * sint + v1yp * cost;
        const v2xp2 = v2xp * cost - v2yp * sint;
        const v2yp2 = v2xp * sint + v2yp * cost;
        return [
            new Vec2(v1xp2, v1yp2),
            new Vec2(v2xp2, v2yp2)
        ];
    }
    isPointInsize(x, y) {
        const { x: xc, y: yc } = this;
        const rc = this.size / 2;
        return Math.abs(xc - x) < rc && Math.abs(yc - y) < rc;
    }
    isCollisionWith(particle) {
        const { x: x1, y: y1 } = this;
        const r1 = this.size / 2;
        const { x: x2, y: y2 } = particle;
        const r2 = particle.size / 2;
        return Math.abs(x1 - x2) < r1 + r2 && Math.abs(y1 - y2) < r1 + r2;
    }
}
