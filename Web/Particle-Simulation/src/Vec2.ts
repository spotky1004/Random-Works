export default class Vec2 {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setX(value: number) {
    return new Vec2(value, this.y);
  }

  setY(value: number) {
    return new Vec2(this.x, value);
  }

  add(v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      const rad = this.getRad();
      return new Vec2(this.x + v * Math.cos(rad), this.y + v * Math.sin(rad));
    } else {
      return new Vec2(this.x + v.x, this.y + v.y);
    }
  }

  sub(v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      return this.add(-v);
    } else {
      return new Vec2(this.x - v.x, this.y - v.y);
    }
  }

  rotate(rad: number) {
    const { x, y } = this;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    return new Vec2(x*cos - y*sin, x*sin + y*cos);
  }

  getRad() {
    return (Math.PI*2 + Math.atan2(this.y, this.x)) % (Math.PI*2);
  }

  getSize() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
