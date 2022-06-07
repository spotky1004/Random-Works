export default class Node {
    constructor(data) {
        this.name = data.nodeName;
        this.typeName = data.typeName;
        this.assemblyName = data.assemblyName;
        this.isUsedBy = [];
        this.dependsOn = [];
    }
    addLine(type, node) {
        this[type].push(node);
    }
}
