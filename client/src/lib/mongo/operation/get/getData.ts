import HomeHero from "../../Schema/homeHero/homeHero";
import dbConnect from "../../mongo";
export default async function getHomeHero() {
  await dbConnect();
  try {
    const savedContent = await HomeHero.find({});
    return savedContent;
  } catch (error) {
    return null;
  }
}
