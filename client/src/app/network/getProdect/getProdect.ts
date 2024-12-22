import axios from "axios";
import config from "../config";
interface FATCH_OPTIONS {
  prodectId: string;
  callback: any;
  email:string
}

export default function getProdect(option: FATCH_OPTIONS) {
  axios
    .get(`${config.HOST_SERVER_BASE_POINT}/review/${option.prodectId}${option.email?`?email=${option.email}`:""}`)
    .then((res) => {
      option.callback(res);
    })
    .catch((err) => {
      option.callback(err);
    });
}
