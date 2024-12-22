import { redisDB } from "@/lib/radius/config";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  if (!redisDB.isOpen) {
    redisDB.connect();
  }
  const formData = await req.formData();
  const email = formData.get("email");
  const prodect_name = formData.get("prodect_name");
  const convert = formData.get("convert");
  const id = formData.get("id");
  let convertNow = false;
  let data = null;
  if (convert == "true") {
    convertNow = true;
    try {
      
      const items =  await redisDB.hGet("favorite",id)
     
      const favoriteItem = JSON.parse(items) 
      favoriteItem.push(email)
      await redisDB.hSet("favorite",id,JSON.stringify(favoriteItem))
    } catch (error) {
    }
  } else {
    convertNow = false;
    try {
      const items =  await redisDB.hGet("favorite",id)
      const favoriteItem = JSON.parse(items).filter((item,index)=>item!=email)
      await redisDB.hSet("favorite",id,JSON.stringify(favoriteItem))

    } catch (error) {
    }
  }
  return NextResponse.json({ success: true, convert: convertNow, data });
}


