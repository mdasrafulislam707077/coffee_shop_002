import axios from "axios";
import { config } from "../../config";
export function getProdectItems({ isCoffee = false }, result) {
  const host = !isCoffee ? `${config.SERVER_HOST}/items/tea` : `${config.SERVER_HOST}/items/coffee`;
  axios
    .get(host)
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

export function postProdectItems(
  { isCoffee = false, prodectItem = [], oldId = [], removeImage = [] },
  result
) {
  let removeData = oldId.map((element, index) => {
    const find = prodectItem?.find((element2, index2) => {
      return element2._id == element._id;
    });
    if (!find) {
      return element;
    }
    return null;
  });
  removeData = removeData?.filter((element, index) => {
    return element != null;
  });
  let newData = prodectItem.map((element, index) => {
    const find = oldId?.find((element2, index2) => element2._id == element._id);
    if (!find) {
      return element;
    }
    return null;
  });
  newData = newData?.filter((element, index) => {
    return element != null;
  });
  const formData = new FormData();

  for (const element of newData) {
    const id = element._id;
    for (const imageItem of element.imageItems) {
      if (imageItem.fullFile) {
        formData.append(`file-->>${id}<<--`, imageItem.fullFile);
      } else {
        formData.append(`file-->>${id}<<--`, JSON.stringify(imageItem));
      }
    }
    if (element?.mainImage?.fullFile) {
      formData.append(`file-->>${id}<<--main`, element?.mainImage?.fullFile);
    } else {
      formData.append(`file-->>${id}<<--main`, JSON.stringify(element?.mainImage));
    }
  }
  formData.append("data", JSON.stringify(newData));
  formData.append("removeData", JSON.stringify(removeData));
  formData.append("removeImage", JSON.stringify(removeImage));
  const host = !isCoffee ? `${config.SERVER_HOST}/items/tea` : `${config.SERVER_HOST}/items/coffee`;
  axios
    .post(host, formData)
    .then((res) => {
      if (result) {
        result({ res: res, newData });
      }
    })
    .catch((err) => {
      if (result) {
        result({ res: err });
      }
    });
}
