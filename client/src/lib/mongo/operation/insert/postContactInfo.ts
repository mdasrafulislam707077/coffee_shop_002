import dbConnect from "../../mongo";
import PopulerBranch from "../../Schema/populerBranch/populerBranch";
import ContactInfo from "../../Schema/contactInfo/contactInfo";
export default async function insertContactInfo(contentData) {
  await dbConnect();
  const newContent = new ContactInfo(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}
