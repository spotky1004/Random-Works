import keyToNodeDatas, { NodeDatas } from "./keyToNodeDatas.js";
import type { AssemblyName } from "../class/Node.js";

interface RawNode {
  isUsedBy: string[];
  dependsOn: string[];
}
type LogJson = { [typeName: string]: RawNode };

export interface ParsedNode {
  nodeName: string;
  typeName: string;
  assemblyName: AssemblyName;
  isUsedBy: ParsedNode[];
  dependsOn: ParsedNode[];
}
export type ParsedLog = { [typeName: string]: ParsedNode };

function nodeDatasToNodeName(nodeDatas: NodeDatas) {
  return nodeDatas.typeName + "_" + nodeDatas.assemblyName;
}

export default function logParser(logJson: LogJson): ParsedLog {
  const parsed: ParsedLog = {};

  // Init nodes
  for (const key in logJson) {
    const nodeDatas = keyToNodeDatas(key);
    const nodeName = nodeDatasToNodeName(nodeDatas);
    parsed[nodeName] = {
      nodeName: nodeName,
      typeName: nodeDatas.typeName,
      assemblyName: nodeDatas.assemblyName as AssemblyName,
      isUsedBy: [],
      dependsOn: []
    };
  }

  // Add isUsedBy & dependsOn
  for (const key in logJson) {
    const nodeDatas = keyToNodeDatas(key);
    const nodeName = nodeDatasToNodeName(nodeDatas);
    const node = parsed[nodeName];
    const { isUsedBy, dependsOn } = logJson[key];

    for (let i = 0; i < isUsedBy.length; i++) {
      const _nodeDatas = keyToNodeDatas(isUsedBy[i]);
      const _nodeName = nodeDatasToNodeName(_nodeDatas);
      node.isUsedBy.push(parsed[_nodeName]);
    }
    for (let i = 0; i < dependsOn.length; i++) {
      const _nodeDatas = keyToNodeDatas(dependsOn[i]);
      const _nodeName = nodeDatasToNodeName(_nodeDatas);
      node.dependsOn.push(parsed[_nodeName]);
    }

    Object.freeze(node);
    Object.freeze(isUsedBy);
    Object.freeze(dependsOn);
  }

  Object.freeze(parsed);
  return parsed;
}
