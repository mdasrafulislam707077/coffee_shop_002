import axios from "axios";
import isEqual from "utility/isEql/isEql";
import { config } from "./../../config";
export function postNewCoffeeItems({ newCoffeeItem, memo }, result) {
  for (const element of newCoffeeItem) {
    if (!element.title) {
      result({ err: true });
      return;
    }
    if (!element.des) {
      result({ err: true });
      return;
    }
    if (!(element?.image?.webUrl || element?.image?.fullFile)) {
      result({ err: true });
      return;
    }
    for (const item of element.textItems) {
      if (!item?.title) {
        result({ err: true });
        return;
      }
      if (!item?.value) {
        result({ err: true });
        return;
      }
    }
  }
  let allFiles = newCoffeeItem.map((element, index) => {
    return element?.image;
  });
  const formData = new FormData();
  let filecount = 1;
  for (const iterator of allFiles) {
    if (iterator.webUrl) {
      formData.append(`file-${filecount}`, JSON.stringify(iterator));
    } else {
      formData.append(`file-${filecount}`, iterator.fullFile);
    }

    filecount++;
  }
  const newTextItem = newCoffeeItem.map((element, index) => {
    return {
      ...element,
      image: null,
    };
  });
  let removeImage = [];
  memo.forEach((element, index) => {
    const find = newCoffeeItem.find((element2, index2) => {
      console.log(isEqual(element2.image, element));
      return isEqual(element2.image, element);
    });
    if (!find) {
      removeImage.push(element);
    }
  });
  formData.append("removeImage", JSON.stringify(removeImage));
  formData.append("data", JSON.stringify(newTextItem));
  console.log(formData);
  axios
    .post(`${config.SERVER_HOST}/home/newCoffeeItems`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (result) {
        result({ data: res });
      }
    })
    .catch((err) => {
      if (result) {
        result({ err: err });
      }
    });
}
