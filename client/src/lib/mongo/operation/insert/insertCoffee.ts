import dbConnect from "../../mongo";
import ItemCoffee from "../../Schema/itemsCoffee/itemsCoffee";
export default async function insertItemCoffee(contentData) {
  try {
    await dbConnect();
    const savedContent = await ItemCoffee.insertMany(contentData);
    return savedContent;
  } catch (error) {
    throw null;
  }
}
