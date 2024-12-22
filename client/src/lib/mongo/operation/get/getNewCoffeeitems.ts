import dbConnect from "../../mongo";
import NewCoffeeItem from "../../Schema/newCoffeeItems/newCoffeeItems";
export default async function getNewCoffeeItem() {
  await dbConnect();
  try {
    const newContent = await NewCoffeeItem.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
