const arrayFormat = new RegExp(
  /(?<parentName>[A-Z]\w+)\[(?<index>[0-9])+].(?<fieldName>[A-Z]\w+)/i
);
const objectFormat = new RegExp(
  /(?<parentName>[A-Z]\w+)(\.)(?<fieldName>[A-Z]\w+)/i
);

const deconstructor = {
  array: (name, property, newValue) => {
    const {parentName, index, fieldName} = name.match(arrayFormat).groups;
    if (newValue) {
      property[parentName][index][fieldName] = newValue;
    }
    return (
      property[parentName] &&
      property[parentName][index] &&
      property[parentName][index][fieldName]
    );
  },
  object: (name, property, newValue) => {
    const {parentName, fieldName} = name.match(objectFormat).groups;
    if (newValue) {
      property[parentName][fieldName] = newValue;
    }
    return property[parentName] && property[parentName][fieldName];
  },
  simple: (name, property, newValue) => {
    if (newValue) {
      property[name] = newValue;
    }
    return property[name];
  },
};

const fieldNameCompiler = (name, property, newValue) => {
  const type =
    (arrayFormat.test(name) && "array") ||
    (objectFormat.test(name) && "object") ||
    "simple";

  return deconstructor[type](name, property, newValue);
};

export default fieldNameCompiler;
