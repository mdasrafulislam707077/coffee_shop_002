import axios from "axios";
import { config } from "./../../config";
export function postContactInfo(info, result) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(info));
  axios
    .post(`${config.SERVER_HOST}/contact/info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (result) {
        result(res);
      }
    })
    .catch((err) => {
      if (result) {
        result(err);
      }
    });
}
