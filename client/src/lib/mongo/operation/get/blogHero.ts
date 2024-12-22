import dbConnect from "../../mongo";
import BlogHero from "../../Schema/blogHero/aboutHero";
export default async function getBlogHero() {
  await dbConnect();
  try {
    const newContent = await BlogHero.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
