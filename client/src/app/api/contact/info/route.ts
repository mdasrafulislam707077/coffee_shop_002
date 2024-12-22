import insertContactInfo from "@/lib/mongo/operation/insert/postContactInfo";
import ContactInfo from "@/lib/mongo/Schema/contactInfo/contactInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res) {
  const formData = await req.formData();
  try {
    const data = JSON.parse(formData.get("data"));
    try {
      await ContactInfo.deleteMany();
    } catch (error) {}
    await insertContactInfo({
      ...data,
    });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json({ success: false }, { status: 400 });
}
