import LayerCanvas from "./LayerCanvas.js";
import localAttrToGlobalAttr, { ObjectAttrs, CameraAttrs } from "../util/localAttrToGlobalAttr.js";
import type App from "./App";
import type Node from "./Node";

interface Camera {
  x: number;
  y: number;
  zoom: number;
}

export default class AppCanvas {
  app: App;
  canvas: LayerCanvas;
  camera: Camera;

  constructor(app: App, canvas: HTMLCanvasElement) {
    this.app = app;
    this.canvas = new LayerCanvas(3, canvas);
    this.camera = {
      x: -25000,
      y: -25000,
      zoom: 1/50000
    };
  }

  getCanvasAttr() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      x: this.camera.x,
      y: this.camera.y,
      zoom: this.camera.zoom
    }
  }

  render(highlightNodes: Node[] = []) {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    this.canvas.initCtx(WIDTH, HEIGHT);
    const [{ ctx: nodeCtx }, { ctx: lineCtx }, { ctx: bgCtx }] = this.canvas.getAllLayers();
    
    const canvasAttr: CameraAttrs = this.getCanvasAttr();

    bgCtx.fillStyle = "#222";
    bgCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const nodes = this.app.nodeManager.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      const isHightlightNode = highlightNodes.includes(node);
      const alpha = highlightNodes.length >= 1 ? (isHightlightNode ? 1 : 0.2) : 1;
      nodeCtx.globalAlpha = alpha;
      lineCtx.globalAlpha = alpha;

      const localData: ObjectAttrs = {
        x: node.attr.x,
        y: node.attr.y,
        size: !isHightlightNode ? node.attr.size : Math.max(node.attr.size*1.2, 0.1/canvasAttr.zoom)
      };
      const globalData = localAttrToGlobalAttr(localData, canvasAttr);
      if (!globalData.size) continue;
      
      // Node circle
      nodeCtx.fillStyle = node.assemblyName === "Assembly-CSharp" ? "#fff" : "#aaa";
      nodeCtx.beginPath();
      nodeCtx.arc(globalData.x, globalData.y, globalData.size, 0, 2*Math.PI);
      nodeCtx.fill();
      // const textMetrics = nodeCtx.measureText(node.name);
      nodeCtx.fillStyle = "#000";
      nodeCtx.font = `bold ${globalData.size/node.name.length*3}px 'Roboto Mono'`;
      nodeCtx.fillText(
        node.name,
        globalData.x-globalData.size*0.9,
        globalData.y, globalData.size*1.8
      );

      // Node lines
      const { isUsedBy, dependsOn } = node;
      const lineFrom = globalData;
      lineCtx.strokeStyle = "#54e31b";
      for (let i = 0; i < isUsedBy.length; i++) {
        const nodeToConnect = isUsedBy[i];
        const lineTo = localAttrToGlobalAttr(nodeToConnect.attr, canvasAttr);
        lineCtx.beginPath();
        lineCtx.moveTo(lineFrom.x, lineFrom.y);
        lineCtx.lineTo(lineTo.x, lineTo.y);
        lineCtx.stroke();
      }
      lineCtx.strokeStyle = "#e3931b";
      for (let i = 0; i < dependsOn.length; i++) {
        const nodeToConnect = dependsOn[i];
        const lineTo = localAttrToGlobalAttr(nodeToConnect.attr, canvasAttr);
        lineCtx.beginPath();
        lineCtx.moveTo(lineFrom.x, lineFrom.y);
        lineCtx.lineTo(lineTo.x, lineTo.y);
        lineCtx.stroke();
      }
    }
    this.canvas.mergeLayers(WIDTH, HEIGHT);
  }
}
