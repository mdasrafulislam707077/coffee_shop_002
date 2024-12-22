import actions from "./actionname";
export function injectProdect(prodect) {
  return {
    type: actions.INJECT_CART_PRODECT,
    prodects: prodect,
  };
}
export function addProdect(prodect) {
  return {
    type: actions.ADD_CART_PRODECT,
    prodects: prodect,
  };
}

export function removeProdect(prodect) {
  return {
    type: actions.REMOVE_CART_PRODECT,
    prodects: prodect,
  };
}

export function removeAllProdect() {
  return {
    type: actions.REMOVE_ALL_CART_PRODECT,
  };
}
