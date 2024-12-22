import dbConnect from "../../mongo";
import ContactInfo from "../../Schema/contactInfo/contactInfo";
export default async function getContactInfo() {
  await dbConnect();
  try {
    const newContent = await ContactInfo.find({});
    return newContent;
  } catch (error) {
    return null;
  }
}
