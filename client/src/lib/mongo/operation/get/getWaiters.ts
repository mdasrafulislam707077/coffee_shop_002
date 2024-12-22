import dbConnect from "../../mongo";
import OurResponsivleWaiter from "../../Schema/aboutHero/OurResponsivlewaiters";
export default async function getOurResponsivleWaiter() {
  await dbConnect();
  try {
    const newContent = await OurResponsivleWaiter.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
