import dbConnect from "../../mongo";
import HomeHero from "../../Schema/homeHero/homeHero";
export default async function insertContent(contentData) {
  await dbConnect();
  const newContent = new HomeHero(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
