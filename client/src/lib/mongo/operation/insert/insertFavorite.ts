import dbConnect from "../../mongo";
import Favorite from "../../Schema/favorite/favorite";
export default async function insertFavorite(contentData) {
  try {
    await dbConnect();
    const savedContent = await Favorite.insertMany(contentData);
    return savedContent;
  } catch (error) {
    throw null;
  }
}
