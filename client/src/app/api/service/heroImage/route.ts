import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import getServiceHero from "@/lib/mongo/operation/get/serviceHero";
import insertServiceHero from "@/lib/mongo/operation/insert/serviceHero";
import ServiceHero from "@/lib/mongo/Schema/serviceHero/serviceHero";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res) {
  const reuslt = await getServiceHero();
  return NextResponse.json({ success: true, data: reuslt[0] });
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
      await ServiceHero.deleteMany();
    } catch (error) {}
    let data;
    try {
      data = {
        image: fileUploadResult.fileItems,
        title: fileUploadResult.title,
        description: fileUploadResult.description,
      };
      await insertServiceHero(data);
    } catch (error) {}
    return NextResponse.json(
      { success: true, data: { ...data } },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
