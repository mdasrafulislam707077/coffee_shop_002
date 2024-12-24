import dbConnect from "../../mongo";
import Payment_token from "../../Schema/payment_token/token";
export default async function createPaymentToken(contentData) {
  await dbConnect();
  const newContent = new Payment_token(contentData);
  const savedContent = await newContent.save();
  return savedContent;
}