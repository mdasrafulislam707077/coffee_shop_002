import dbConnect from "../../mongo";
import Payment_token from "../../Schema/payment_token/token";
import ItemTea from "../../Schema/itemsTea/itemsTea";
import ItemCoffee from "../../Schema/itemsCoffee/itemsCoffee";

export async function updateCoffee(query, updateData) {
  await dbConnect();

  const updatedContent = await ItemCoffee.findOneAndUpdate(query, updateData, {
    new: true, 
  });

  return updatedContent;
}

export async function updateTea(query, updateData) {
  await dbConnect();

  const updatedContent = await ItemTea.findOneAndUpdate(query, updateData, {
    new: true, 
  });

  return updatedContent;
}
