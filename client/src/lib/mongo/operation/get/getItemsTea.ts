import ItemTea from "../../Schema/itemsTea/itemsTea";
import dbConnect from "../../mongo";
export default async function getItemsTea() {
  await dbConnect();
  try {
    const savedContent = await ItemTea.find({});
    return savedContent;
  } catch (error) {
    return null;
  }
}
