import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import { redisDB } from "@/lib/radius/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res) {
  if (!redisDB.isOpen) {
    redisDB.connect();
  }
  const allCoffee = await getItemCoffee();
  const allTea = await getItemsTea();
  const modifyTea = allTea?.map((element, index) => {
    return {
      id: element._id,
      aiDescription: element.aiDescription,
      description: element.description,
      header: element.header,
    };
  });
  const modifyCoffee = allCoffee?.map((element, index) => {
    
    return {
      id: element._id,
      aiDescription: element.aiDescription,
      description: element.description,
      header: element.header,
    };
  });
  const result = await axios.post(`${process.env.ML_HOST}/similar/`, {
    prodects: [...modifyTea, ...modifyCoffee],
  });
  if (result?.data?.success) {
    const items = JSON.parse(result?.data?.matx);
   try {
    await redisDB.del("prodects");
    await redisDB.del("favorite");
    await redisDB.del("comment");
    await redisDB.del("price");
    await redisDB.del("quantity");
   } catch (error) {
    
   }
    for (const element of Object.keys(items)) {
      await redisDB.hSet("prodects", element, JSON.stringify(items[element]));
      await redisDB.hSet("favorite", element, JSON.stringify([]));
      await redisDB.hSet("comment", element, JSON.stringify([]));
      const prodectPrice =  [...allCoffee,...allTea].find((element2,index)=>{
        return element2._id == element
      })
      await redisDB.hSet("price", element, prodectPrice?.price);
      await redisDB.hSet("quantity", element,prodectPrice?.quantity);
    }
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
