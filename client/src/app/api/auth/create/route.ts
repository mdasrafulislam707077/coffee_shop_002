import getUser from "@/lib/mongo/operation/get/getUser";
import insertUser from "@/lib/mongo/operation/insert/user";
import bcrypt from "bcryptjs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, context) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const isExsist = await getUser({ email: email });
    if (isExsist?.length == 0) {
      if (!name || name.trim().length < 2) {
        return NextResponse.json(
          { error: "Name must be at least 2 characters long." },
          { status: 400 }
        );
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email address." },
          { status: 400 }
        );
      }
      if (!password || password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters long." },
          { status: 400 }
        );
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      try {
        await insertUser({
          password: hashedPassword,
          email: email,
          name: name,
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, error: "An error occurred during processing." },
          { status: 500 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Form data is valid",
      });
    } else {
      return NextResponse.json(
        { error: "email already exist", success: true },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "An error occurred during processing." },
      { status: 500 }
    );
  }
}
