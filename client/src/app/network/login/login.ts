import axios from "axios";
import config from "../config";
function userLogin({ formInfo }, callback) {
  if (!(formInfo.email && formInfo.password)) {
    callback();
    return;
  }
  const formData = new FormData();
  formData.append("email", formInfo.email);
  formData.append("password", formInfo.password);
  axios
    .post(`${config.HOST_SERVER_BASE_POINT}/auth/login`, formData)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
}

export default userLogin;
