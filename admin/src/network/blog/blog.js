import axios from "axios";
import { config } from "./../../config";
export function getBlogInfo(result) {
  axios
    .get(`${config.SERVER_HOST}/blog/heroImage`)
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

export function postHeroContext({ fullFile, title, description, webUrl, oldImage }, result) {
  const formData = new FormData();

  if (fullFile) {
    formData.append("file-1", fullFile);
    if (oldImage) {
      formData.append("removeImage", JSON.stringify([oldImage]));
    }
  } else {
    formData.append("file-1", JSON.stringify(oldImage));
  }
  formData.append("title", title);
  formData.append("description", description);
  axios
    .post(`${config.SERVER_HOST}/blog/heroImage`, formData, {
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
