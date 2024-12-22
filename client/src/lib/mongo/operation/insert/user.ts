import dbConnect from "../../mongo";
import User from "../../Schema/user/user";
export default async function insertUser(contentData) {
  await dbConnect();
  const newContent = new User(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
