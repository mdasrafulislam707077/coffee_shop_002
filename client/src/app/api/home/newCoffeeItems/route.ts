import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import insertNewCoffeeItem from "@/lib/mongo/operation/insert/newCoffeeItems";
import NewCoffeeItem from "@/lib/mongo/Schema/newCoffeeItems/newCoffeeItems";
import { NextRequest, NextResponse } from "next/server";

import path from "path";
const POST = async (req: NextRequest, res) => {
  const formData = await req.formData();
  const targetpath = path.join(
    __dirname,
    "../../../../../../public/content/image001"
  );
  const reusltImage = await FileUploader({
    data: formData,
    checkOnlyFile: true,
    backStap: "../../../../../../",
    targetPath: targetpath,
  });
  if (reusltImage?.fileErros.length == 0) {
    const textContextItems = JSON.parse(formData.get("data"));
    const data = textContextItems.map((element, index) => {
      return {
        text: element,
        image: reusltImage?.fileItems[index],
      };
    });
    try {
      await NewCoffeeItem.deleteMany();
    } catch (error) {}
    try {
      await insertNewCoffeeItem({
        data: data,
      });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    return NextResponse.json({ data: data, success: true }, { status: 200 });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
};

export { POST };
