import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import getContactHero from "@/lib/mongo/operation/get/contactHero";
import getContactInfo from "@/lib/mongo/operation/get/getContact";
import insertContactHero from "@/lib/mongo/operation/insert/contactHero";
import ContactHero from "@/lib/mongo/Schema/contactHero/contactHero";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res) {
  const reuslt = await getContactHero();
  const info = await getContactInfo();
  return NextResponse.json({ success: true, data: reuslt[0], info });
}

export async function POST(req: NextRequest, res) {
  const formData = await req.formData();
  const fileUploadResult = await FileUploader({
    checkOnlyFile: true,
    data: formData,
    backStap: "../../../../../../",
  });
  if (fileUploadResult.title && fileUploadResult.description) {
    try {
      await ContactHero.deleteMany();
    } catch (error) {}
    let data;
    try {
      data = {
        image: fileUploadResult.fileItems,
        title: fileUploadResult.title,
        description: fileUploadResult.description,
      };
      const r = await insertContactHero(data);
      console.log(r);
    } catch (error) {}

    return NextResponse.json(
      { success: true, data: { ...data } },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
