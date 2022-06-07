import keyToNodeDatas from "./keyToNodeDatas.js";
function nodeDatasToNodeName(nodeDatas) {
    return nodeDatas.typeName + "_" + nodeDatas.assemblyName;
}
export default function logParser(logJson) {
    const parsed = {};
    // Init nodes
    for (const key in logJson) {
        const nodeDatas = keyToNodeDatas(key);
        const nodeName = nodeDatasToNodeName(nodeDatas);
        parsed[nodeName] = {
            nodeName: nodeName,
            typeName: nodeDatas.typeName,
            assemblyName: nodeDatas.assemblyName,
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
            node.dependsOn.push(parsed[_nodeName]);
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
