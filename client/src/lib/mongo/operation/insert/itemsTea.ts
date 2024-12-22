import dbConnect from "../../mongo";
import ItemTea from "../../Schema/itemsTea/itemsTea";

export default async function insertItemsTea(contentData) {
  try {
    await dbConnect();
    const savedContent = await ItemTea.insertMany(contentData);
    return savedContent;
  } catch (error) {
    throw null;
  }
}
