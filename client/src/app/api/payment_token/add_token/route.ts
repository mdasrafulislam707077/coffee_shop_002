import deletePaymentToken from "@/lib/mongo/operation/delete/paymentTokendelete";
import getPaymentToken from "@/lib/mongo/operation/get/get_payment_token";
import { NextRequest, NextResponse } from "next/server";
import createPaymentToken from "@/lib/mongo/operation/insert/createPaymentToken";
export async function POST(req: NextRequest, res) {
  const items = await getPaymentToken();
  const formData = await req.formData();
  const email = formData.get("email");
  const findEmail = items?.find((element, key) => {
    return element.email == email;
  });
  let obj = null;
  if (!findEmail) {
    obj = {
      email: email,
      items: [
        {
          token: formData.get("token"),
          create_time: Date.now(),
        },
      ],
      record: []
    };
    await createPaymentToken({ ...obj });
  } else {
    const cData = findEmail;
    const findToken = cData.items.find(
      (element, index) => element.token == formData.get("token")
    );
    if (!findToken) {
      cData.items = [
        ...cData.items,
        { token: formData.get("token"), create_time: Date.now() },
      ];
      obj = cData;
      await deletePaymentToken({ email: email });
      delete cData["_id"]
      delete cData["__v"]
      await createPaymentToken({
        items:cData.items,
        email:cData.email,
        record:cData.record,
        
      });
    }
  }
  return NextResponse.json({ success: true, item: obj }, { status: 200 });
}
