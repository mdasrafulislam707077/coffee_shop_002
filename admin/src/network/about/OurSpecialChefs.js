import axios from "axios";
import { config } from "./../../config";

export function postCshItems(
  { cshf = false, ourPopulerChfs = [], oldChfsId = [], removeImageChfsList = [] },
  result
) {
  let removeData = oldChfsId.map((element, index) => {
    const find = ourPopulerChfs?.find((element2, index2) => {
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
  let newData = ourPopulerChfs.map((element, index) => {
    const find = oldChfsId?.find((element2, index2) => element2._id == element._id);
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
  formData.append("removeImage", JSON.stringify(removeImageChfsList));
  const host = !cshf
    ? `${config.SERVER_HOST}/about/OurSpecialChefs`
    : `${config.SERVER_HOST}/about/OurResponsivleWaiters`;
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
