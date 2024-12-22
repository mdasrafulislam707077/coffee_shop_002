import dbConnect from "../../mongo";
import OurResponsivleWaiter from "../../Schema/aboutHero/OurResponsivlewaiters";
export default async function insertOurResponsivleWaiter(contentData) {
  try {
    await dbConnect();
    const savedContent = await OurResponsivleWaiter.insertMany(contentData);
    return savedContent;
  } catch (error) {
    throw null;
  }
}
