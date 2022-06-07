export interface BaseAttrs {
  x: number;
  y: number;
}
export interface ObjectAttrs extends BaseAttrs {
  size?: number;
}
export interface CameraAttrs extends BaseAttrs {
  width: number;
  height: number;
  zoom: number;
}

export default function localAttrToGlobalAttr(localPos: ObjectAttrs, cameraAttr: CameraAttrs) {
  const { x: localX, y: localY, size } = localPos;
  const { x: cameraX, y: cameraY, zoom, width, height } = cameraAttr;

  const globalAttr: ObjectAttrs = {
    x: (localX-cameraX)*zoom*Math.min(width, height),
    y: (localY-cameraY)*zoom*Math.min(width, height),
    size: size ? size*zoom*Math.min(width, height) : undefined
  };
  if (width > height) {
    globalAttr.x += (width-height)/2;
  } else {
    globalAttr.y += (height-width)/2;
  }
  return globalAttr;
}