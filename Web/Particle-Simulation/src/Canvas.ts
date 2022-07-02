interface CanvasOptions {
  canvasEl: HTMLCanvasElement;
  size: {
    width: number;
    height: number;
  };
  camera: Camera;
}
interface Camera {
  x: number;
  y: number;
  zoom: number;
}

export interface BaseAttrs {
  x: number;
  y: number;
}
export interface ObjectAttrs extends BaseAttrs {
}
export interface ObjectAttrsWithSize extends BaseAttrs {
  size: number;
}
export interface GlobalAttrs extends BaseAttrs {
  width: number;
  height: number;
  zoom: number;
}

export default class Canvas {
  canvasEl: HTMLCanvasElement;
  private readonly _canvasEl: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private canvasAttr: GlobalAttrs;
  private _width: number;
  private _height: number;
  private readonly camera: Camera;

  constructor(options: CanvasOptions) {
    this.canvasEl = options.canvasEl;
    this._canvasEl = document.createElement("canvas");
    const ctx = this._canvasEl.getContext("2d");
    if (!ctx) {
      throw Error("This browser does not support Canvas");
    }
    this.ctx = ctx;
    this._width = options.size.width;
    this._height = options.size.height;

    this.camera = {
      x: options.camera.x,
      y: options.camera.y,
      zoom: options.camera.zoom
    };

    this.canvasAttr = this.getCanvasAttr();

    this.width = this._width;
    this.height = this._height;
  }

  private getCanvasAttr(): GlobalAttrs {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      x: this.camera.x,
      y: this.camera.y,
      zoom: this.camera.zoom
    };
  }

  private updateCanvasAttr() {
    this.canvasAttr = this.getCanvasAttr();
  }

  private getGlobalAttr<T extends ObjectAttrs | ObjectAttrsWithSize>(localPos: T): T {
    const { x: localX, y: localY, size } = localPos as ObjectAttrsWithSize;
    const { x: cameraX, y: cameraY, zoom, width, height } = this.canvasAttr;
  
    const globalAttr: ObjectAttrsWithSize = {
      x: (localX-cameraX)*zoom*Math.min(width, height),
      y: (localY-cameraY)*zoom*Math.min(width, height),
      size: size*zoom*Math.min(width, height)
    };
    if (width > height) {
      globalAttr.x += (width-height)/2;
    } else {
      globalAttr.y += (height-width)/2;
    }
    return globalAttr as any;
  }

  set width(value: number) {
    this._width = value;
    this.canvasEl.width = value;
    this._canvasEl.width = value;
    this.updateCanvasAttr();
  }

  set height(value: number) {
    this._height = value;
    this.canvasEl.height = value;
    this._canvasEl.height = value;
    this.updateCanvasAttr();
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set x(value: number) {
    this.camera.x = value;
    this.updateCanvasAttr();
  }

  set y(value: number) {
    this.camera.y = value;
    this.updateCanvasAttr();
  }

  set zoom(value: number) {
    this.camera.zoom = value;
    this.updateCanvasAttr();
  }

  get x() {
    return this.camera.x;
  }

  get y() {
    return this.camera.y;
  }

  get zoom() {
    return this.camera.zoom;
  }

  set strokeStyle(value: string | CanvasGradient | CanvasPattern) {
    this.ctx.strokeStyle = value;
  }

  get strokeStyle() {
    return this.ctx.strokeStyle;
  }

  set fillStyle(value: string | CanvasGradient | CanvasPattern) {
    this.ctx.fillStyle = value;
  }

  get fillStyle() {
    return this.ctx.fillStyle;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    const { x: _x1, y: _y1 } = this.getGlobalAttr({ x: x1, y: y1 });
    const { x: _x2, y: _y2 } = this.getGlobalAttr({ x: x2, y: y2 });
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(_x1, _y1);
    ctx.lineTo(_x2, _y2);
    ctx.stroke();
    ctx.restore();
  }

  fillRect(x: number, y: number, w: number, h: number) {
    const { x: _x, y: _y, size: _w } = this.getGlobalAttr({ x, y, size: w });
    const { size: _h } = this.getGlobalAttr({ x: 0, y: 0, size: h });
    
    this.ctx.fillRect(_x, _y, _w, _h);
  }

  clearRect() {
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  fillCircle(x: number, y: number, radius: number) {
    const { x: _x, y: _y, size: _radius } = this.getGlobalAttr({ x, y, size: radius });

    this.ctx.beginPath();
    this.ctx.arc(_x, _y, _radius, 0, 2*Math.PI);
    this.ctx.fill();
  }

  render() {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    const ctx = this.canvasEl.getContext("2d");
    if (ctx) ctx.putImageData(imageData, 0, 0);
  }
}
