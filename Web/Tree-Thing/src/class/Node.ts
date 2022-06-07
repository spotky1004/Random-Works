import type { ParsedNode } from "../util/logParser";

export type AssemblyName = "Assembly-CSharp" | "Assembly-CSharp-Firstpass";
type LineTypes = "isUsedBy" | "dependsOn";

export default class Node {
  name: string;
  typeName: string;
  assemblyName: AssemblyName;
  isUsedBy: Node[];
  dependsOn: Node[];
  attr: { x: number; y: number, size: number };

  constructor(data: ParsedNode) {
    this.name = data.nodeName;
    this.typeName = data.typeName;
    this.assemblyName = data.assemblyName;
    this.isUsedBy = [];
    this.dependsOn = [];
    this.attr = { x: 0, y: 0, size: 60 };
  }

  addLine(type: LineTypes, node: Node) {
    this[type].push(node);
  }

  isSpotInNode(x: number, y: number): boolean {
    return Math.sqrt((this.attr.x-x)**2 + (this.attr.y-y)**2) < this.attr.size;
  }
}
