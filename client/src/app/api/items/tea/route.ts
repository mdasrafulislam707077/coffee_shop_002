import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import insertItemsTea from "@/lib/mongo/operation/insert/itemsTea";
import ItemTea from "@/lib/mongo/Schema/itemsTea/itemsTea";
import { deleteFile } from "@/lib/operation/delete/delete";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { fileUploader } from "./filehandler";
export async function GET(req: NextRequest, res) {
  const teaResult = await getItemsTea();
  return NextResponse.json({ data: teaResult });
}
export async function POST(req: NextRequest, res) {
  const formData = await req.formData();
  await removeData(formData);
  const filePath = path.join(__dirname, "./../../../../../../public/");
  const fileinfo = await fileUploader({
    data: formData,
    filepath: filePath,
  });
  if (fileinfo) {
    await insertItemsTea(fileinfo);
    return NextResponse.json(
      { success: true, data: fileinfo },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json({ success: false }, { status: 200 });
}

async function removeData(formData) {
  try {
    const parseData = JSON.parse(formData.get("removeImage"));
    for (const item of parseData) {
      try {
        await deleteFile(
          path.join(
            __dirname,
            "./../../../../../../public/content/image001",
            item.webUrl
          )
        );
      } catch (error) {}
    }
  } catch (error) {}
  try {
    const parseData = JSON.parse(formData.get("removeData"));
    for (const element of parseData) {
      try {
        await ItemTea.deleteOne({ _id: element._id });
      } catch (error) {}
    }
  } catch (error) {}
}
