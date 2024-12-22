import axios from "axios";
import config from "../config";
export function getToken(info, callback) {
  if (!info?.email_client) {
    callback();
    return;
  }
  const formdata = new FormData();
  formdata.append("api_key", config.API_KEY);
  formdata.append("client_email", info.email_client);
  formdata.append("api_name", config?.API_NAME);
  axios
    .post(
      `${config.PAYMENT_HOST_BASE_POINT}/transection/getApiPaymentToken/`,
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
