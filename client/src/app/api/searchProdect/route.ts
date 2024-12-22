import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import prodectSorter from "@/utility/prodectSorter/prodectSorter";
import axios from "axios";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest, res) {
  const formData = await req.formData();
  const searchItem = formData.get("search");
  const coffeeItems = await getItemCoffee();
  const teaItems = await getItemsTea();
  const allitems = coffeeItems?.map((element, index) => {
    return {
      id: element?.id,
      header: element?.header,
      aiDescription: element?.aiDescription,
      description: element?.description,
      price: element?.price,
      discount: element?.discount,
      image: element?.mainImage,
    };
  });
  const allTeaitems = teaItems?.map((element, index) => {
    return {
      id: element?.id,
      header: element?.header,
      aiDescription: element?.aiDescription,
      price: element?.price,
      image: element?.mainImage,
      discount: element?.discount,
      description: element?.description,
    };
  });
  const coffeAndTeaItems = [...allitems, ...allTeaitems];
  const query = await axios.post(`${process.env.ML_HOST}/getProdect/`, {
    query: searchItem,
    prodects: coffeAndTeaItems,
  });
  let findItems = [];
  if (query.data) {
    const result = prodectSorter(query.data?.value);
    const items = result?.filter((e) => e?.rate != 0);
    const allProdect = items?.map((e) => {
      const find = coffeAndTeaItems?.find((i) => i.id == e._id);
      if (find) {
        return find;
      }
      return null;
    });
    findItems = [...allProdect];
  }
  return Response.json({ success: true, items: findItems });
}
