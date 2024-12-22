import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import getAboutHero from "@/lib/mongo/operation/get/aboutHero";
import getOurSpecialChef from "@/lib/mongo/operation/get/getOurSpecialChef";
import getOurResponsivleWaiter from "@/lib/mongo/operation/get/getWaiters";
import insertAboutHero from "@/lib/mongo/operation/insert/aboutHero";
import AboutHero from "@/lib/mongo/Schema/aboutHero/aboutHero";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res) {
  const reuslt = await getAboutHero();
  const getOSC = await getOurSpecialChef();
  const getORW = await getOurResponsivleWaiter();
  return NextResponse.json({
    success: true,
    data: reuslt[0],
    OSC: getOSC,
    ORW: getORW,
  });
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
      await AboutHero.deleteMany();
    } catch (error) {}
    let data;
    try {
      data = {
        image: fileUploadResult.fileItems,
        title: fileUploadResult.title,
        description: fileUploadResult.description,
      };
      await insertAboutHero(data);
    } catch (error) {}
    return NextResponse.json(
      { success: true, data: { ...data } },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  console.log(fileUploadResult);
}
