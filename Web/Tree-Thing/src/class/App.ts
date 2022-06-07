import NodeManager from "./NodeManager.js";
import AppCanvas from "./AppCanvas.js";
import AppEventsManager from "./AppEventsManager.js";
import type Node from "./Node";
import type { ParsedLog } from "../util/logParser";

interface AppOptions {
  canvas: HTMLCanvasElement,
  searchBox: HTMLInputElement,
  fileSelect: HTMLInputElement
}

export default class App {
  canvas: AppCanvas;
  searchBox: HTMLInputElement;
  fileSelect: HTMLInputElement;
  nodeManager: NodeManager;
  eventsManager: AppEventsManager;

  constructor(options: AppOptions) {
    this.canvas = new AppCanvas(this, options.canvas);
    this.searchBox = options.searchBox;
    this.fileSelect = options.fileSelect;
    this.nodeManager = new NodeManager({});
    this.eventsManager = new AppEventsManager(this, options.canvas);
  }

  readParsedLog(parsedLog: ParsedLog) {
    this.nodeManager = new NodeManager(parsedLog);
    this.render();
  }

  render() {
    const highlightNodes: Node[] = [];
    const searchQuery = this.searchBox.value;
    if (searchQuery.length > 0) {
      highlightNodes.push(...this.nodeManager.nodes.filter(node => node.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    if (this.eventsManager.holdingNode) {
      highlightNodes.push(this.eventsManager.holdingNode);
    }
    this.canvas.render(highlightNodes);
  }
}
