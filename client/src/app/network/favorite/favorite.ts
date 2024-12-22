import axios from "axios";
import config from "../config";

export default function favoritePost(
  { email, prodect_name, convert,id },
  callback
) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("prodect_name", prodect_name);
  formData.append("convert", convert??false);
  formData.append("id", id);
  axios
    .post(`${config.HOST_SERVER_BASE_POINT}/favorites`, formData)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
}
