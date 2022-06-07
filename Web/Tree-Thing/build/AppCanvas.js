export default class AppCanvas {
    constructor(app, canvas) {
        this.app = app;
        this.canvas = canvas;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Your borwser doesn't supports canvas!");
        }
        this.ctx = ctx;
    }
    render() {
    }
}
