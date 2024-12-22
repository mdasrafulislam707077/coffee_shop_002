import axios from "axios";
import isEqual from "utility/isEql/isEql";
import { config } from "./../../config";

export function postOurBranch({ populerBranch = [], memo = [] }, result) {
  const removeImage = [];
  const formData = new FormData();
  const textData = [];
  let filecount = 1;
  memo.forEach((element, index) => {
    const find = populerBranch.find((element2, index2) => {
      return isEqual(element2.image, element);
    });
    if (!find) {
      removeImage.push(element);
    }
  });
  formData.append("removeImage", JSON.stringify(removeImage));

  for (const iterator of populerBranch) {
    if (!(iterator?.image?.webUrl || iterator?.image?.fullFile)) {
      result({ formInvalid: true });
      return;
    }
    if (iterator?.image?.webUrl) {
      formData.append(`file-${filecount}`, JSON.stringify(iterator?.image));
    } else {
      formData.append(`file-${filecount}`, iterator?.image?.fullFile?.fullFile);
    }
    filecount++;
  }
  const textItems = populerBranch.map((element, index) => {
    return element.textContext;
  });
  formData.append("textContext", JSON.stringify(textItems));
  for (const element of textItems) {
    if (element.length == 0) {
      result({ formInvalid: true });
      return;
    }

    for (const item of element) {
      if (!item.text) {
        result({ formInvalid: true });
        return;
      }
    }
  }
  axios
    .post(`${config.SERVER_HOST}/home/branchInfo`, formData)
    .then((res) => {
      if (result) {
        result({ data: res.data });
      }
    })
    .catch((err) => {
      if (result) {
        result({ data: [], err });
      }
    });
}
