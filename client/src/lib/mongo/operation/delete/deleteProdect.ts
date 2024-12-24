import dbConnect from "../../mongo";
import Payment_token from "../../Schema/payment_token/token";
import ItemTea from "../../Schema/itemsTea/itemsTea";
import ItemCoffee from "../../Schema/itemsCoffee/itemsCoffee";
export  async function deleteCoffee(query) {
  await dbConnect();

  const deletedContent = await ItemCoffee.findOneAndDelete(query);

  return deletedContent;
}


export  async function deleteTea(query) {
    await dbConnect();
  
    const deletedContent = await ItemTea.findOneAndDelete(query);
  
    return deletedContent;
  }
  