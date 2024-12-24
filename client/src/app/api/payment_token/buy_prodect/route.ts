import config from "@/app/network/config";
import getItemCoffee from "@/lib/mongo/operation/get/getItemsCoffee";
import getItemsTea from "@/lib/mongo/operation/get/getItemsTea";
import { redisDB } from "@/lib/radius/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { updateCoffee } from "@/lib/mongo/operation/update/coffee_tea";

export async function POST(req: NextRequest, res) {
  if (!redisDB.isOpen) {
    redisDB.connect();
  }
  const formData = await req.formData();
  const id = formData.get("id");
  const count = formData.get("count");
  const discount = formData.get("discount");
  const price = formData.get("price");
  const token = formData.get("token");
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
        try {
          const reuslt = await axios.post(
            `${config.PAYMENT_HOST_BASE_POINT}/transection/apiPaymentService`,
            {
              api_name: config.API_NAME,
              api_key: config.API_KEY,
              token: token,
              amount: price * count,
            }
          );
        } catch (error) {
          if (error?.response?.data) {
            console.log(error.response.data);
            for (const key in error.response.data) {
              if (
                Object.prototype.hasOwnProperty.call(error.response.data, key)
              ) {
                const element = error.response.data[key];

                if (element["error_type"] == "server-side") {
                  return NextResponse.json(
                    {
                      success: false,
                      errMsg: "server-side-issue..please try again later !!!",
                    },
                    { status: 200 }
                  );
                } else {
                  try {
                    return NextResponse.json(
                      {
                        success: false,
                        errMsg: element[Object.keys(element)[0]],
                      },
                      { status: 200 }
                    );
                  } catch (error) {
                    return NextResponse.json(
                      {
                        success: false,
                        errMsg: "server-side-issue..please try again later !!!",
                      },
                      { status: 200 }
                    );
                  }
                }
              }
            }
          } else {
            return NextResponse.json(
              {
                success: false,
                errMsg: "server-side-issue..please try again later !!!",
              },
              { status: 200 }
            );
          }
        }

        return NextResponse.json({ success: true, msg: "" }, { status: 200 });
      } else {
        if (count == 0) {
          return NextResponse.json(
            {
              success: false,
              errMsg:
                "We're sorry, but the product you're looking for is currently out of stock.",
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
                "We're sorry, but the product you're looking for is currently out of stock.",
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
