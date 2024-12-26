import getPaymentToken from "@/lib/mongo/operation/get/get_payment_token";
import createPaymentToken from "@/lib/mongo/operation/insert/createPaymentToken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res) {
  const items = await getPaymentToken();
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get("email");
  const findEmail = items?.find((element, key) => {
    return element.email == email;
  });
  let obj = null;
  if (!findEmail) {
    obj = { email: email,  record: [] };
    await createPaymentToken({ ...obj });
  } else {
    obj = findEmail;
  }
  return NextResponse.json({ success: true, item: obj }, { status: 200 });
}
