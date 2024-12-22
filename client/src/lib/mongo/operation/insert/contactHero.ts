import dbConnect from "../../mongo";
import ContactHero from "../../Schema/contactHero/contactHero";
export default async function insertContactHero(contentData) {
  await dbConnect();
  const newContent = new ContactHero(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
