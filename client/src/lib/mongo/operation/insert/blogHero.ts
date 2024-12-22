import dbConnect from "../../mongo";
import BlogHero from "../../Schema/blogHero/aboutHero";
export default async function insertBlogHero(contentData) {
  await dbConnect();
  const newContent = new BlogHero(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
