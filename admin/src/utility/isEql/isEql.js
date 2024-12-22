export default function isEqual(obj1, obj2) {
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    if (obj1 === null || obj2 === null) {
      return obj1 === obj2;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
}
