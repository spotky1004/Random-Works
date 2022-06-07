export default function keyToNodeDatas(key) {
    const datas = key.split(", ");
    return {
        typeName: datas[0],
        assemblyName: datas[1]
    };
}
