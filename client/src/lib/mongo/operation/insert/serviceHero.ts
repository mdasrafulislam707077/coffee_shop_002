import dbConnect from "../../mongo";
import ServiceHero from "../../Schema/serviceHero/serviceHero";
export default async function insertServiceHero(contentData) {
  await dbConnect();
  const newContent = new ServiceHero(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
