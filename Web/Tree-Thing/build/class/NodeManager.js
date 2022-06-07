import Node from "./Node.js";
export default class NodeManager {
    constructor(parsedLog) {
        this.nodes = [];
        const nodePairs = {};
        const totalNodes = Object.keys(parsedLog).length;
        let nodeIdx = 0;
        // Init nodes
        for (const key in parsedLog) {
            const nodeData = parsedLog[key];
            const node = new Node(nodeData);
            node.attr.x = Math.sin(Math.PI * 2 * nodeIdx / totalNodes) * 25000;
            node.attr.y = Math.cos(Math.PI * 2 * nodeIdx / totalNodes) * 25000;
            this.nodes.push(node);
            nodePairs[nodeData.nodeName] = node;
            nodeIdx++;
        }
        // Add isUsedBy & dependsOn
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const { isUsedBy, dependsOn } = parsedLog[node.name];
            for (let i = 0; i < isUsedBy.length; i++) {
                const data = isUsedBy[i];
                node.addLine("isUsedBy", nodePairs[data.nodeName]);
            }
            for (let i = 0; i < dependsOn.length; i++) {
                const data = dependsOn[i];
                node.addLine("dependsOn", nodePairs[data.nodeName]);
            }
        }
    }
    getNodeByPosition(x, y) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if (node.isSpotInNode(x, y)) {
                return node;
            }
        }
        return undefined;
    }
}
