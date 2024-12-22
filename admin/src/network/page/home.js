import axios from "axios";
import { config } from "./../../config";
export function getHomeHeroContext(result) {
  axios
    .get(`${config.SERVER_HOST}/home`)
    .then((res) => {
      if (result) {
        result(res.data);
      }
    })
    .catch((err) => {
      if (result) {
        result(err);
      }
    });
}

export function postHomeHeroContext({ heroImageContext, removeImage }, result) {
  const formData = new FormData();
  let filecount = 1;
  for (const iterator of heroImageContext.image) {
    if (iterator.webUrl) {
      formData.append(`file-${filecount}`, JSON.stringify(iterator));
    } else {
      formData.append(`file-${filecount}`, iterator.fullFile);
    }

    filecount++;
  }
  formData.append("title", heroImageContext.title);
  formData.append("header", heroImageContext.header);
  formData.append("description", heroImageContext.description);
  formData.append("removeImage", JSON.stringify(removeImage));
  axios
    .post(`${config.SERVER_HOST}/home`, formData, {
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
