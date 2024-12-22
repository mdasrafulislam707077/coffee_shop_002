export default function prodectSorter(list = [], top = 20) {
  const newList = list.sort((a, b) => b?.rate - a?.rate);
  const topItems = newList.slice(0, Math.min(top, newList.length));
  return topItems;
}
