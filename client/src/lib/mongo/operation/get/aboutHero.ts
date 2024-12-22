import dbConnect from "../../mongo";
import AboutHero from "../../Schema/aboutHero/aboutHero";
export default async function getAboutHero() {
  await dbConnect();
  try {
    const newContent = await AboutHero.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
