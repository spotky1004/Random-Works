import logParser from "../util/logParser.js";
export default class AppEventsManager {
    constructor(app, canvas) {
        this.app = app;
        this.canvas = canvas;
        this.holding = false;
        this.holdingNode = undefined;
        this.prevMousePos = { x: 0, y: 0 };
        this.screenMovingSpeed = { x: 0, y: 0 };
        this.init();
    }
    pixelPosToGlobalPos(width, height, x, y) {
        const { x: cameraX, y: cameraY, zoom } = this.app.canvas.camera;
        const offset = {
            x: 0,
            y: 0
        };
        if (width > height) {
            offset.x -= (width - height) / 2;
        }
        else {
            offset.y -= (width - height) / 2;
        }
        const pos = {
            x: (x + offset.x) / Math.min(width, height) / zoom + cameraX,
            y: (y + offset.y) / Math.min(width, height) / zoom + cameraY
        };
        return pos;
    }
    init() {
        document.addEventListener("blur", () => {
            this.resetEventDatas();
        });
        this.canvas.addEventListener("mouseleave", () => {
            this.holding = false;
            this.holdingNode = undefined;
            this.app.render();
        });
        document.addEventListener("keydown", (e) => {
            this.keydown(e.key);
        });
        this.canvas.addEventListener("mousedown", (e) => {
            this.holding = true;
            const globalPos = this.pixelPosToGlobalPos(this.canvas.width, this.canvas.height, e.offsetX, e.offsetY);
            this.holdingNode = this.app.nodeManager.getNodeByPosition(globalPos.x, globalPos.y);
            if (this.holdingNode) {
                const nodeList = this.app.nodeManager.nodeList;
                nodeList.scrollToNode(this.holdingNode);
                nodeList.openNodeInfo(this.holdingNode);
            }
            this.app.render();
        });
        this.canvas.addEventListener("mouseup", () => {
            this.holding = false;
            this.holdingNode = undefined;
            this.app.render();
        });
        this.canvas.addEventListener("mousemove", (e) => {
            const to = this.pixelPosToGlobalPos(this.canvas.width, this.canvas.height, e.offsetX, e.offsetY);
            this.mousemove(to);
        });
        this.canvas.addEventListener("wheel", (e) => {
            this.wheel(e.deltaY);
        });
        this.app.fileSelect.addEventListener("change", () => {
            const fileList = this.app.fileSelect.files;
            if (!fileList)
                return;
            const file = fileList[0];
            if (!file)
                return;
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                try {
                    if (typeof fileReader.result === "string") {
                        const parsedLog = logParser(JSON.parse(fileReader.result));
                        this.app.readParsedLog(parsedLog);
                    }
                }
                catch (e) {
                    throw e;
                }
            });
            fileReader.readAsText(file);
        });
        this.app.changeLayoutBtn.addEventListener("click", () => {
            this.app.nodeManager.changeLayout();
        });
        this.app.searchBox.addEventListener("keydown", () => {
            this.app.nodeManager.nodeList.applySearch(this.app.searchBox.value);
            this.app.render();
        });
        this.app.searchBox.addEventListener("change", () => {
            this.app.nodeManager.nodeList.applySearch(this.app.searchBox.value);
            this.app.render();
        });
    }
    tick() {
        const camera = this.app.canvas.camera;
        if (Math.abs(this.screenMovingSpeed.x) > 0.001 / camera.zoom ||
            Math.abs(this.screenMovingSpeed.y) > 0.001 / camera.zoom) {
            camera.x += this.screenMovingSpeed.x;
            camera.y += this.screenMovingSpeed.y;
            this.screenMovingSpeed.x *= 0.95;
            this.screenMovingSpeed.y *= 0.95;
            this.app.render();
        }
        else {
            this.screenMovingSpeed.x = 0;
            this.screenMovingSpeed.y = 0;
        }
    }
    mousemove(to) {
        const from = this.prevMousePos;
        const dl = {
            x: to.x - from.x,
            y: to.y - from.y
        };
        this.prevMousePos = { ...to };
        if (this.holdingNode) {
            const node = this.holdingNode;
            node.attr.x += dl.x;
            node.attr.y += dl.y;
            this.app.render();
        }
        else if (this.holding) {
            this.screenMovingSpeed.x -= dl.x / 10;
            this.screenMovingSpeed.y -= dl.y / 10;
        }
    }
    wheel(dy) {
        const camera = this.app.canvas.camera;
        let prevZoom = camera.zoom;
        camera.zoom *= 1.01 ** (-dy / 8);
        camera.x -= (1 / camera.zoom - 1 / prevZoom) / 2;
        camera.y -= (1 / camera.zoom - 1 / prevZoom) / 2;
        this.app.render();
    }
    keydown(key) {
        if (this.holdingNode) {
            const node = this.holdingNode;
            let scale = 1;
            if (key === "-" || key === "_") {
                scale /= 1.05;
            }
            else if (key === "=" || key === "+") {
                scale *= 1.05;
            }
            if (scale !== 1) {
                node.attr.size *= scale;
                this.app.render();
            }
        }
    }
    resetEventDatas() {
        this.holding = false;
        this.holdingNode = undefined;
        this.prevMousePos = { x: 0, y: 0 };
    }
}
