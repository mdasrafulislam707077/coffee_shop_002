import dbConnect from "../../mongo";
import ContactHero from "../../Schema/contactHero/contactHero";
export default async function getContactHero() {
  await dbConnect();
  try {
    const newContent = await ContactHero.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
