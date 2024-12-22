import getUser from "@/lib/mongo/operation/get/getUser";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, context) {
  try {
    const decoded = jwt.verify(
      req.headers?.get("authorization")?.replaceAll("Bearer ", ""),
      process.env.JWT_SECRET
    );
    if (decoded) {
      const result = await getUser({ email: decoded?._doc?.email });
      if (result.length != 0) {
        return NextResponse.json(
          { success: true, name: result[0].name, email: result[0].email },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ success: false }, { status: 400 });
      }
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
