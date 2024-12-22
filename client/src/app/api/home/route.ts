import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import getHomeHero from "@/lib/mongo/operation/get/getData";
import getNewCoffeeItem from "@/lib/mongo/operation/get/getNewCoffeeitems";
import getPopulerBranch from "@/lib/mongo/operation/get/populerBranch";
import insertContent from "@/lib/mongo/operation/insert/insert";
import HomeHero from "@/lib/mongo/Schema/homeHero/homeHero";
import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest, res) => {
  const formData = await req.formData();
  const fileUploadresult = await FileUploader({
    data: formData,
    backStap: "../../../../../",
  });

  if (
    fileUploadresult.fileErros.length == 0 &&
    fileUploadresult.texterror.length == 0
  ) {
    try {
      await HomeHero.deleteMany();
      await insertContent({
        title: fileUploadresult.title,
        header: fileUploadresult.header,
        images: fileUploadresult.fileItems,
        description: fileUploadresult.description,
      });
      return NextResponse.json(
        {
          success: true,
          hero_context: {
            title: fileUploadresult.title,
            header: fileUploadresult.header,
            images: fileUploadresult.fileItems,
            description: fileUploadresult.description,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 402 });
    }
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
};

const GET = async (req: NextRequest, res) => {
  return NextResponse.json(
    {
      
    },
    { status: 200 }
  );

  const hero_context = await getHomeHero();
  const populerBranchData = await getPopulerBranch();
  const getNewCoffeeItemdata = await getNewCoffeeItem();
  if (hero_context?.length > 0) {
    return NextResponse.json(
      {
        success: true,
        data: {
          hero_context: hero_context[0],
          ourBranch: populerBranchData[0],
          newCoffeeItem: getNewCoffeeItemdata[0],
        },
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 402 });
  }
};

export { GET, POST };
