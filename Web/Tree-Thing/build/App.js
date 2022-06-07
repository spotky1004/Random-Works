import NodeManager from "./NodeManager.js";
import AppCanvas from "./AppCanvas.js";
export default class App {
    constructor(options) {
        this.canvas = new AppCanvas(this, options.canvas);
        this.nodeManager = new NodeManager(options.parsedLog);
    }
}
