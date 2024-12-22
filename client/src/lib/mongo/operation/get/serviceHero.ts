import dbConnect from "../../mongo";
import ServiceHero from "../../Schema/serviceHero/serviceHero";
export default async function getServiceHero() {
  await dbConnect();
  try {
    const newContent = await ServiceHero.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
