import LayerCanvas from "./LayerCanvas.js";
import localAttrToGlobalAttr from "../util/localAttrToGlobalAttr.js";
export default class AppCanvas {
    constructor(app, canvas) {
        this.app = app;
        this.canvas = new LayerCanvas(AppCanvas.layerNames, canvas);
        this.camera = {
            x: 0,
            y: 0,
            zoom: 1 / 100
        };
    }
    getCanvasAttr() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            x: this.camera.x,
            y: this.camera.y,
            zoom: this.camera.zoom
        };
    }
    drawNode(options) {
        const nodeCtx = this.canvas.getLayer("node").ctx;
        const { node, mode, canvasAttr } = options;
        const alpha = mode === "ghost" ? 0.3 : 1;
        nodeCtx.globalAlpha = alpha;
        const localSize = mode !== "highlight" ? node.attr.size : Math.max(node.attr.size, 0.1 / canvasAttr.zoom);
        const globalAttr = localAttrToGlobalAttr({
            x: node.attr.x,
            y: node.attr.y,
            size: localSize
        }, canvasAttr);
        if (!globalAttr.size)
            return;
        // node circle
        nodeCtx.fillStyle = node.attr.color;
        nodeCtx.strokeStyle = "#333";
        nodeCtx.lineWidth = Math.min(globalAttr.size / 10, 3);
        nodeCtx.beginPath();
        nodeCtx.arc(globalAttr.x, globalAttr.y, globalAttr.size, 0, 2 * Math.PI);
        nodeCtx.fill();
        nodeCtx.stroke();
        // node text
        this.fillText({
            text: node.fileName,
            ctx: nodeCtx,
            color: "#000",
            x: node.attr.x,
            y: node.attr.y,
            textAlign: "center",
            baseline: "middle",
            maxSize: localSize / 6,
            maxWidth: localSize,
            canvasAttr,
        });
        this.fillText({
            text: node.assemblyName,
            ctx: nodeCtx,
            color: "#888",
            x: node.attr.x,
            y: node.attr.y + localSize / 6,
            textAlign: "center",
            baseline: "middle",
            maxSize: localSize / 8,
            maxWidth: localSize,
            canvasAttr,
        });
        if (mode === "highlight") {
            this.drawNode({
                ...options,
                mode: "ghost"
            });
        }
    }
    drawLines(options) {
        const { node: nodeFrom, mode, canvasAttr } = options;
        const { isUsedBy, dependsOn } = nodeFrom;
        const nodeFromAttr = localAttrToGlobalAttr(nodeFrom.attr, canvasAttr);
        for (let i = 0; i < isUsedBy.length; i++) {
            const nodeToConnect = isUsedBy[i];
            const nodeToAttr = localAttrToGlobalAttr(nodeToConnect.attr, canvasAttr);
            this.drawLine({
                lineType: "isUsedBy",
                nodeFromAttr,
                nodeToAttr,
                mode,
                canvasAttr
            });
        }
        for (let i = 0; i < dependsOn.length; i++) {
            const nodeToConnect = dependsOn[i];
            const nodeToAttr = localAttrToGlobalAttr(nodeToConnect.attr, canvasAttr);
            this.drawLine({
                lineType: "dependsOn",
                nodeFromAttr,
                nodeToAttr,
                mode,
                canvasAttr
            });
        }
    }
    drawLine(options) {
        const lineCtx = this.canvas.getLayer("line").ctx;
        const { mode, lineType, nodeFromAttr, nodeToAttr, canvasAttr } = options;
        const screenSize = Math.min(canvasAttr.width, canvasAttr.height);
        const deg = Math.atan2(nodeToAttr.y - nodeFromAttr.y, nodeToAttr.x - nodeFromAttr.x);
        const offsetLength = Math.min(nodeToAttr.size, nodeFromAttr.size) / 10;
        const xOffset = lineType === "isUsedBy" ? offsetLength * Math.cos(deg + Math.PI / 2) : -offsetLength * Math.cos(deg - Math.PI / 2);
        const yOffset = lineType === "isUsedBy" ? offsetLength * Math.sin(deg + Math.PI / 2) : -offsetLength * Math.sin(deg - Math.PI / 2);
        const xStart = nodeFromAttr.x + (nodeFromAttr.size + 3) * Math.cos(deg) + xOffset;
        const yStart = nodeFromAttr.y + (nodeFromAttr.size + 3) * Math.sin(deg) + yOffset;
        const xEnd = nodeToAttr.x - (nodeToAttr.size + 3) * Math.cos(deg) + xOffset;
        const yEnd = nodeToAttr.y - (nodeToAttr.size + 3) * Math.sin(deg) + yOffset;
        lineCtx.globalAlpha = mode === "ghost" ? 0.15 : 1;
        lineCtx.strokeStyle = lineType === "isUsedBy" ? "#54e31b" : "#e3931b";
        lineCtx.lineWidth = mode === "highlight" ? Math.max(screenSize / 100, 1) : 1;
        lineCtx.shadowBlur = mode === "highlight" ? screenSize / 100 : 0;
        lineCtx.lineCap = "round";
        // arrow body
        lineCtx.beginPath();
        lineCtx.moveTo(xStart, yStart);
        lineCtx.lineTo(xEnd, yEnd);
        // arrow head
        const arrawHeadLength = Math.min(nodeToAttr.size, nodeFromAttr.size) / 3;
        lineCtx.moveTo(xEnd, yEnd);
        lineCtx.lineTo(xEnd - arrawHeadLength * Math.cos(deg + Math.PI / 8), yEnd - arrawHeadLength * Math.sin(deg + Math.PI / 8));
        lineCtx.moveTo(xEnd, yEnd);
        lineCtx.lineTo(xEnd - arrawHeadLength * Math.cos(deg - Math.PI / 8), yEnd - arrawHeadLength * Math.sin(deg - Math.PI / 8));
        lineCtx.stroke();
    }
    fillText(options) {
        const { ctx, canvasAttr, ignoreCamera, text, color, x, y, maxSize = Infinity, maxWidth = Infinity, baseline = "alphabetic", textAlign = "left" } = options;
        ctx.save();
        const localAttr1 = { x, y, size: maxWidth };
        const localAttr2 = { x, y, size: maxSize };
        const globalAttr = !ignoreCamera ? localAttrToGlobalAttr(localAttr1, canvasAttr) : localAttr1;
        const fontSize = Math.min(globalAttr.size / text.length * 3, localAttrToGlobalAttr(localAttr2, canvasAttr).size);
        ctx.fillStyle = color;
        ctx.textBaseline = baseline;
        ctx.textAlign = textAlign;
        ctx.font = `bold ${fontSize}px 'Roboto Mono'`;
        ctx.fillText(text, globalAttr.x, globalAttr.y);
        ctx.restore();
    }
    render(highlightNodes = []) {
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;
        this.canvas.initCtx(WIDTH, HEIGHT);
        const bgCtx = this.canvas.getLayer("bg").ctx;
        const canvasAttr = this.getCanvasAttr();
        bgCtx.fillStyle = "#222";
        bgCtx.fillRect(0, 0, WIDTH, HEIGHT);
        const nodes = this.app.nodeManager.nodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const isHightlightNode = highlightNodes.includes(node);
            const isGhostNode = highlightNodes.length >= 1 && !isHightlightNode;
            const mode = isGhostNode ? "ghost" : isHightlightNode ? "highlight" : "normal";
            this.drawNode({
                node,
                mode,
                canvasAttr
            });
            this.drawLines({
                node,
                mode,
                canvasAttr
            });
        }
        this.canvas.mergeLayers(WIDTH, HEIGHT);
    }
}
AppCanvas.layerNames = ["info", "node", "line", "bg"];
