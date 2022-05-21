// const _defaultKeys = {
//   id: "Id",
//   pid: "Pid",
//   key: "Id",
//   childNodes: "childNodes",
//   isLeaf: "isLeaf",
//   title: "title",
// };
const _defaultKeys = {
  id: "Id",
  pid: "ParentId",
  key: "Id",
  childNodes: "Children",
  isLeaf: "isLeaf",
  title: "MenuName",
};
const createDataTree = (dataset, keys = {}) => {
  const _keys = Object.assign({}, _defaultKeys, keys);
  const hashTable = {};
  dataset.forEach(
    (aData) =>
      (hashTable[aData[_keys.id]] = {
        ...aData,
        [_keys.childNodes]: [],
        key: aData[_keys.key],
        [_keys.isLeaf]: true,
        title: aData[_keys.title],
      })
  );
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData[_keys.pid]) {
      hashTable[aData[_keys.pid]][_keys.childNodes].push(
        hashTable[aData[_keys.id]]
      );
      hashTable[aData[_keys.pid]][_keys.isLeaf] = false;
    } else {
      const rootNodeObj = hashTable[aData[_keys.id]];
      dataTree.push(rootNodeObj);
    }
  });
  return dataTree;
};
export default createDataTree;
