import keyToNodeDatas from "./keyToNodeDatas.js";
function nodeDatasToParsedKey(nodeDatas) {
    return nodeDatas.typeName + "_" + nodeDatas.assemblyName;
}
export default function logParser(logJson) {
    const parsed = {};
    // Init nodes
    for (const key in logJson) {
        const nodeDatas = keyToNodeDatas(key);
        const parsedKey = nodeDatasToParsedKey(nodeDatas);
        parsed[parsedKey] = {
            isUsedBy: [],
            dependsOn: []
        };
    }
    // Add isUsedBy & dependsOn
    for (const key in logJson) {
        const node = parsed[key];
        const nodeDatas = keyToNodeDatas(key);
        const parsedKey = nodeDatasToParsedKey(nodeDatas);
        const { isUsedBy, dependsOn } = logJson[parsedKey];
        for (let i = 0; i < isUsedBy.length; i++) {
            const _nodeDatas = keyToNodeDatas(isUsedBy[i]);
            const _parsedKey = nodeDatasToParsedKey(_nodeDatas);
            node.dependsOn.push(parsed[_parsedKey]);
        }
        for (let i = 0; i < dependsOn.length; i++) {
            const _nodeDatas = keyToNodeDatas(dependsOn[i]);
            const _parsedKey = nodeDatasToParsedKey(_nodeDatas);
            node.dependsOn.push(parsed[_parsedKey]);
        }
        Object.freeze(node);
        Object.freeze(isUsedBy);
        Object.freeze(dependsOn);
    }
    return parsed;
}
