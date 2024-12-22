import dbConnect from "../../mongo";
import OurSpecialChef from "../../Schema/aboutHero/OurSpecialChefs";
export default async function insertOurSpecialChef(contentData) {
  try {
    await dbConnect();
    const savedContent = await OurSpecialChef.insertMany(contentData);
    return savedContent;
  } catch (error) {
    throw null;
  }
}
