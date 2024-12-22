import dbConnect from "../../mongo";
import PopulerBranch from "../../Schema/populerBranch/populerBranch";
export default async function insertPopulerBranch(contentData) {
  await dbConnect();
  const newContent = new PopulerBranch(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
