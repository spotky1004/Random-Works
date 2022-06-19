export default class Node {
    constructor(data, color) {
        this.nodeKey = data.nodeKey;
        this.fileName = data.fileName;
        this.assemblyName = data.assemblyName;
        this.isUsedBy = [];
        this.dependsOn = [];
        this.attr = { x: 0, y: 0, size: 60, color };
    }
    addLine(type, node) {
        this[type].push(node);
    }
    isSpotInNode(x, y) {
        return Math.sqrt((this.attr.x - x) ** 2 + (this.attr.y - y) ** 2) < this.attr.size;
    }
}
