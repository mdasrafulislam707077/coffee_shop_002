import actionName from "./actionname";
import listOfProdect from "./state";
export default function cartProdectReducer(state = listOfProdect, actions) {
  switch (actions.type) {
    case actionName.ADD_CART_PRODECT:
      return { ...state, cartOfList: actions.prodects };
    case actionName.INJECT_CART_PRODECT:
      return { ...state, cartOfList: actions.prodects };

    case actionName.REMOVE_ALL_CART_PRODECT:
      return { ...state, cartOfList: [] };

    case actionName.REMOVE_CART_PRODECT:
      return { ...state, cartOfList: actions.prodects };
    default:
      return state;
  }
}
