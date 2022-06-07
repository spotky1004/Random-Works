export interface NodeDatas {
  typeName: string;
  assemblyName: string;
}

export default function keyToNodeDatas(key: string): NodeDatas {
  const datas = key.split(", ");
  return {
    typeName: datas[0],
    assemblyName: datas[1]
  };
}
