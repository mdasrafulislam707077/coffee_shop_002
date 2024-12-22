import FileUploader from "@/lib/fileUploadhandler/fileUploadhandler";
import getBlogHero from "@/lib/mongo/operation/get/blogHero";
import insertBlogHero from "@/lib/mongo/operation/insert/blogHero";
import BlogHero from "@/lib/mongo/Schema/blogHero/aboutHero";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res) {
  const reuslt = await getBlogHero();
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
      await BlogHero.deleteMany();
    } catch (error) {}
    let data;
    try {
      data = {
        image: fileUploadResult.fileItems,
        title: fileUploadResult.title,
        description: fileUploadResult.description,
      };
      await insertBlogHero(data);
    } catch (error) {}
    return NextResponse.json(
      { success: true, data: { ...data } },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }

}
