import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import { redisDB } from "@/lib/radius/config";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest,context) {
    if (!redisDB.isOpen) {
        redisDB.connect();
      }
    const items =  await redisDB.hGetAll("favorite")
    const prodect = []
    for (const element of Object.keys(items)) {
        const item = items[element] 
        const findItem = JSON.parse(item).find((element)=>context?.params?.email==element)
        if (findItem) {
            const objItems = await getItemCoffee({_id:element})
            
            if (!objItems || objItems.length==0) {
                const objItems = await getItemsTea({_id:element})
                    
                prodect.push({
                    _id:objItems[0]._id,
                    description:objItems[0].description,
                    price:objItems[0]?.price,
                    quantity:objItems[0]?.quantity,
                    header:objItems[0]?.header
                })
            }else{
                prodect.push({
                    _id:objItems[0]._id,
                    description:objItems[0].description,
                    price:objItems[0]?.price,
                    quantity:objItems[0]?.quantity,
                    header:objItems[0]?.header
                })
            }
        }
    }
    return NextResponse.json({ success: true, items:prodect});
} 