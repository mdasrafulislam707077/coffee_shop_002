import Payment_token from "../../Schema/payment_token/token";
import dbConnect from "../../mongo";
export default async function getPaymentToken() {
  await dbConnect();
  try {
    const savedContent = await Payment_token.find({});
    return savedContent;
  } catch (error) {
    return null;
  }
}
