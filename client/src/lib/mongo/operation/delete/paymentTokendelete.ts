import dbConnect from "../../mongo";
import Payment_token from "../../Schema/payment_token/token";

export default async function deletePaymentToken(query) {
  await dbConnect();

  const deletedContent = await Payment_token.findOneAndDelete(query);

  return deletedContent;
}
