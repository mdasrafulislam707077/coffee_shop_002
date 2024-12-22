import { PRODECT_TYPE } from "@/app/components/prodectBox/prodectBox";
import axios from "axios";
import config from "../config";
interface FATCH_OPTIONS {
  prodectType: PRODECT_TYPE;
  pagination: any;
  callback: any;
}
export default function getItems(option: FATCH_OPTIONS) {
  axios
    .get(
      `${config.HOST_SERVER_BASE_POINT}/prodect/${
        option.prodectType == PRODECT_TYPE.TEA ? "tea" : "coffee"
      }${option.pagination ? `?pagination=${option.pagination}` : ""}`
    )
    .then((res) => {
      option.callback(res);
    })
    .catch((err) => {
      option.callback(err);
    });
}
