const listOFCartItems = () => {
  try {
    const items = JSON.parse(localStorage.getItem("cart_items"));
    if (!items) {
      return [];
    }
    return items;
  } catch (error) {
    return [];
  }
};
const listOfProdect = {
  cartOfList: listOFCartItems(),
};
export default listOfProdect;
