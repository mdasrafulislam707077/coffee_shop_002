import dbConnect from "../../mongo";
import NewCoffeeItem from "../../Schema/newCoffeeItems/newCoffeeItems";
export default async function insertNewCoffeeItem(contentData) {
  await dbConnect();
  const newContent = new NewCoffeeItem(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
