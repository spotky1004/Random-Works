import NodeManager from "./NodeManager.js";
import AppCanvas from "./AppCanvas.js";
import AppEventsManager from "./AppEventsManager.js";
export default class App {
    constructor(options) {
        this.canvas = new AppCanvas(this, options.canvas);
        this.searchBox = options.searchBox;
        this.fileSelect = options.fileSelect;
        this.nodeManager = new NodeManager({});
        this.eventsManager = new AppEventsManager(this, options.canvas);
    }
    readParsedLog(parsedLog) {
        this.nodeManager = new NodeManager(parsedLog);
        this.render();
    }
    render() {
        const highlightNodes = [];
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
