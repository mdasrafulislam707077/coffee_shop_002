import dbConnect from "../../mongo";
import ItemCoffee from "../../Schema/itemsCoffee/itemsCoffee";
export default async function getItemCoffee(query = {}) {
  await dbConnect();
  try {
    const savedContent = await ItemCoffee.find(query);
    return savedContent;
  } catch (error) {
    return null;
  }
}
