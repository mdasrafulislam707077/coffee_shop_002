import getUser from "@/lib/mongo/operation/get/getUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
export async function POST(req: NextApiRequest, context) {
  const formData = await req.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const isExsist = await getUser({ email: email });
  if (isExsist.length != 0) {
    const isPasswordValid = bcrypt.compareSync(password, isExsist[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "authentication failed", success: false },
        { status: 400 }
      );
    }
    const payload = isExsist[0];
    payload["password"] = NaN;
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return NextResponse.json(
      { success: true, token, name: payload["name"], email: payload["email"] },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "authentication failed", success: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "authentication failed", success: false },
    { status: 400 }
  );
}
