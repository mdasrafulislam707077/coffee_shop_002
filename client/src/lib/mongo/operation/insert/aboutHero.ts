import dbConnect from "../../mongo";
import AboutHero from "../../Schema/aboutHero/aboutHero";
export default async function insertAboutHero(contentData) {
  await dbConnect();
  const newContent = new AboutHero(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
