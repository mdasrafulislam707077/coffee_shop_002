import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import { redisDB } from "@/lib/radius/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res) {
  if (!redisDB.isOpen) {
    redisDB.connect();
  }
  const formData = await req.formData();
  const id = formData.get("id");
  const count = formData.get("count");
  const discount = formData.get("discount");
  const price = formData.get("price");
  let getProdectInfo = null;

  const allCoffee = await getItemCoffee();
  const findCaffee = allCoffee.find((ele, index) => ele._id == id);
  if (!findCaffee) {
    const allTea = await getItemsTea();
    const findTea = allTea.find((ele, index) => ele._id == id);
    getProdectInfo = {
      type: "tea",
      item: findTea,
    };
  } else {
    getProdectInfo = {
      item: findCaffee,
      type: "coffee",
    };
  }

  if (getProdectInfo.item) {
    if (getProdectInfo.type == "tea") {
      if (getProdectInfo.item.quantity >= count && count != 0) {
        return NextResponse.json({ success: true, msg: "" }, { status: 200 });
      } else {
        if (count == 0) {
          return NextResponse.json(
            {
              success: false,
              errMsg:
                "You must order a minimum quantity of one product.",
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              success: false,
              errMsg: `The quantity you requested exceeds our current stock. We currently have only ${getProdectInfo.item.quantity} items available.`,
            },
            { status: 200 }
          );
        }
      }

      // await deleteTea({_id:id})
    } else {
      if (getProdectInfo.item.quantity >= count && count != 0) {
        return NextResponse.json({ success: true, msg: "" }, { status: 200 });
      } else {
        if (count == 0) {
          return NextResponse.json(
            {
              success: false,
              errMsg:
                "You must order a minimum quantity of one product.",
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              success: false,
              errMsg: `The quantity you requested exceeds our current stock. We currently have only ${getProdectInfo.item.quantity} items available.`,
            },
            { status: 200 }
          );
        }
      }

      // await deleteCoffee({_id:id})
    }
  }

  return NextResponse.json(
    { success: false, errMsg: "server side issue..please try again later !!!" },
    { status: 200 }
  );
}
