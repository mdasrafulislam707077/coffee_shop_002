import dbConnect from "../../mongo";
import OurSpecialChef from "../../Schema/aboutHero/OurSpecialChefs";
export default async function getOurSpecialChef() {
  await dbConnect();
  try {
    const newContent = await OurSpecialChef.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
