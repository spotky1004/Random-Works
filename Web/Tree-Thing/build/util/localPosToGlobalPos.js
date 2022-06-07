export default function localPosToGlobalPos(localPos, canvasAttr) {
    const { x: locX, y: locY } = localPos;
    const { cameraX, cameraY, zoom, width, height } = canvasAttr;
    const canvasPos = {
        x: (locX - cameraX) * zoom * width,
        y: (locY - cameraY) * zoom * height
    };
    if (width > height) {
        canvasPos.x += (width - height) / 2;
    }
    else {
        canvasPos.y += (height - width) / 2;
    }
    return canvasPos;
}
