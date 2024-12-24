import deletePaymentToken from "@/lib/mongo/operation/delete/paymentTokendelete";
import getPaymentToken from "@/lib/mongo/operation/get/get_payment_token";
import createPaymentToken from "@/lib/mongo/operation/insert/createPaymentToken";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(req: NextRequest, res) {
  const items = await getPaymentToken();
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get("email");
  const token = queryParams.get("token");
  const findEmail = items?.find((element, key) => {
    return element.email == email;
  });
  let obj = null;
  if (findEmail) {
    const newData = findEmail;
    newData.items = findEmail.items.filter(
      (element, index) => element.token != token
    );
    await deletePaymentToken({ email: email });
    obj = {
      items: newData.items,
      email: newData.email,
    };
    await createPaymentToken({
      ...obj,
    });
  } else {
    obj = null;
  }
  return NextResponse.json(
    { success: true, item: obj ?? { isNull: true } },
    { status: 200 }
  );
}
