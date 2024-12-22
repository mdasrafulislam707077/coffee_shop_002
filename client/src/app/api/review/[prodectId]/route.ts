import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import { redisDB } from "@/lib/radius/config";
import prodectSorter from "@/utility/prodectSorter/prodectSorter";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, context) {
  if (!redisDB.isOpen) {
    redisDB.connect();
  }
  const { params } = context;
  const { prodectId } = params;
  const prodectValue = await redisDB.hGet("prodects", prodectId);
  if (prodectValue != null) {
    const sortProdectValue = await redisDB.hGet("sortProdect", prodectId);
    let prodect = [];
    if (sortProdectValue != null) {
      const getMoroProdect = JSON.parse(sortProdectValue);
      prodect = getMoroProdect;
    } else {
      const parseData = JSON.parse(prodectValue);
      const sortProdect = prodectSorter(parseData, 11);
      const allProdect = [];

      for (const element of sortProdect) {
        const prodectCoffee = await getItemCoffee();
        const findCOffee = prodectCoffee?.find(
          (ele, ind) => ele._id == element.id
        );
        if (findCOffee != null) {
          allProdect.push(findCOffee);
        } else {
          const teaProdect = await getItemsTea();
          const findTea = teaProdect?.find((ele, ind) => ele._id == element.id);
          if (findTea != null) {
            allProdect.push(findTea);
          }
        }
      }
      prodect = allProdect;
      await redisDB.hSet("sortProdect", prodectId, JSON.stringify(prodect));
    }
    let prodectDetails = null;
    const souggestProdect = prodect.filter((ele) => {
      if (ele._id == prodectId) {
        prodectDetails = ele;
      }
      return ele._id != prodectId;
    });
    let favo = await redisDB.hGet("favorite", prodectId);
    let isFavo = false;

    if (req.nextUrl.searchParams.get("email")) {
      favo = JSON.parse(favo)
      try {
        const find = favo?.find((ele, index) => {
          return ele == req.nextUrl.searchParams.get("email");
        });
        if (find) {
          isFavo = true;
        }
      } catch (error) {
        isFavo = false;
      }
    }

    return NextResponse.json(
      {
        success: true,
        prodects: souggestProdect,
        prodect: prodectDetails,
        isFavo,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
