import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, context) => {
  let paginationLvl;
  try {
    paginationLvl = parseInt(req.nextUrl.searchParams.get("pagination"));
  } catch (error) {
    paginationLvl = req.nextUrl.searchParams.get("pagination");
  }
  let prodectItems = null;
  let totalItems = 0;
  let batchLength = 6;
  if (typeof paginationLvl == "number" && paginationLvl > 1) {
    const getItems = await getItemCoffee();
    totalItems = getItems?.length ?? 0;
    const maxPagination = Math.ceil(getItems?.length / batchLength)
    if (paginationLvl > maxPagination) {
      prodectItems = getItems?.slice(
        getItems?.length-batchLength,
        getItems?.length
      );
    } else {
      const prevNum = paginationLvl - 1;
    prodectItems = getItems?.slice(
      prevNum * batchLength,
      paginationLvl * batchLength
    );
    }
    
  } else {
    const getItems = await getItemCoffee();
    totalItems = getItems?.length ?? 0;
    prodectItems = getItems?.slice(0, batchLength);
  }
  return NextResponse.json({ items: prodectItems,totalPagination:Math.ceil(totalItems / batchLength) });
};
