import dbConnect from "../../mongo";
import Favorite from "../../Schema/favorite/favorite";
export default async function getFavorite(query = {}) {
  await dbConnect();
  try {
    const newContent = await Favorite.find(query);
    return newContent;
  } catch (error) {
    return null;
  }
}
