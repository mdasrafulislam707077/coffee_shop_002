import dbConnect from "../../mongo";
import PopulerBranch from "../../Schema/populerBranch/populerBranch";
export default async function getPopulerBranch() {
  await dbConnect();
  try {
    const newContent = await PopulerBranch.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
