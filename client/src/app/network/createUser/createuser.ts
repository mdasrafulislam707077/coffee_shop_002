import axios from "axios";
import config from "../config";
function userCreate({formInfo}, callback) {
    console.log(formInfo)
    if (!(formInfo.name && formInfo.email && formInfo.password)) {
        callback()
        return;
    }
    const formData = new FormData()
    formData.append("name",formInfo.name)
    formData.append("email",formInfo.email)
    formData.append("password",formInfo.password)
  axios
    .post(`${config.HOST_SERVER_BASE_POINT}/auth/create`,formData)
    .then((res) => {
        callback(res)
    })
    .catch((err) => {
        callback(err)
    });
}

export default userCreate;
