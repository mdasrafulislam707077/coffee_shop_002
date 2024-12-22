import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import insertPopulerBranch from "@/lib/mongo/operation/insert/populerBranch";
import PopulerBranch from "@/lib/mongo/Schema/populerBranch/populerBranch";
import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest, res) => {
  const formData = await req.formData();
  const reusltImage = await FileUploader({
    data: formData,
    checkOnlyFile: true,
    backStap: "../../../../../../",
  });
  if (reusltImage?.fileErros.length == 0) {
    const textContextItems = JSON.parse(formData.get("textContext"));
    const data = textContextItems.map((element, index) => {
      return {
        text: element,
        image: reusltImage?.fileItems[index],
      };
    });
    try {
      await PopulerBranch.deleteMany();
    } catch (error) {}
    try {
      await insertPopulerBranch({
        data: data,
      });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    return NextResponse.json({ data: data, success: true }, { status: 200 });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
};

export { POST };
