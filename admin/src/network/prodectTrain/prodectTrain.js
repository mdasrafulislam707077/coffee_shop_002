import axios from "axios";
import { config } from "../../config";
export function postProdectItems(result) {
  const host = `${config.SERVER_HOST}/prodectTrain`;
  axios
    .post(host, {})
    .then((res) => {
      if (result) {
        result({ res: res });
      }
    })
    .catch((err) => {
      if (result) {
        result({ res: err });
      }
    });
}
