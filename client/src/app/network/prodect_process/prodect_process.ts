import axios from "axios";
import config from "../config";
export function prodectCheck(info: any, callback: any) {
  if (!(info?.id && info?.count != null)) {
    callback();
    return;
  }

  const formdata = new FormData();
  formdata.append("id", info?.id);
  formdata.append("count", info?.count);
  formdata.append("discount", info?.discount);
  formdata.append("price", info?.price);
  axios
    .post(
      `${config.HOST_SERVER_BASE_POINT}/payment_token/prodect_check`,
      formdata
    )
    .then((res) => {
      if (callback) {
        callback(res);
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      }
    });
}
interface prodectBuyInterface {
  token: string;
  id: string;
  count: string;
  discount: string;
  price: string;
}
export function prodectBuy(info: prodectBuyInterface, callback: any) {
  if (!( info.token && info.id && info.count && info.discount!=null && info.price )) {
    return;
  }
  const formdata = new FormData();
  formdata.append("id",info.id)
  formdata.append("count",info.count)
  formdata.append("discount",info.discount)
  formdata.append("price",info.price)
  formdata.append("token",info.token)
  axios
    .post(
      `${config.HOST_SERVER_BASE_POINT}/payment_token/buy_prodect`,
      formdata
    )
    .then((res) => {
      if (callback) {
        callback(res);
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      }
    });
}
