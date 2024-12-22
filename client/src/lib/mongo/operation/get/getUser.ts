import dbConnect from "../../mongo";
import User from "../../Schema/user/user";
export default async function getUser(query = {}) {
  await dbConnect();
  try {
    const newContent = await User.find(query);
    return newContent;
  } catch (error) {
    return null;
  }
}
