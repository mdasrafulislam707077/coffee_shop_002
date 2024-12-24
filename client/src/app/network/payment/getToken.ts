import axios from "axios";
import config from "../config";
export function getToken(info, callback) {
  if (!info?.email_client) {
    callback();
    return;
  }
  const formdata = new FormData();
  formdata.append("api_key", config.API_KEY);
  formdata.append("client_email", info.email_client);
  formdata.append("api_name", config?.API_NAME);
  axios
    .post(
      `${config.PAYMENT_HOST_BASE_POINT}/transection/getApiPaymentToken/`,
      formdata
    )
    .then((res) => {
      if (callback) {
        callback(res);
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      }
    });
}

export function createPaymentToken(info:any,callback:any){
  const formData  = new FormData()
  formData.append("token",info.token)
  formData.append("email",info.email)
  axios
    .post(
      `${config.HOST_SERVER_BASE_POINT}/payment_token/add_token`,
      formData
    )
    .then((res) => {
      if (callback) {
        callback(res);
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      }
    });
}


export function getlistOfPaymentToken(info:any,callback:any){
  axios
  .get(
    `${config.HOST_SERVER_BASE_POINT}/payment_token/get_payment?email=${info.email}`
  )
  .then((res) => {
    if (callback) {
      callback(res);
    }
  })
  .catch((err) => {
    if (callback) {
      callback(err);
    }
  });
}




export function deleteToken(info:any,callback:any){
  axios
  .delete(
    `${config.HOST_SERVER_BASE_POINT}/payment_token/delete_token?email=${info.email}&token=${info.token}`
  )
  .then((res) => {
    if (callback) {
      callback(res);
    }
  })
  .catch((err) => {
    if (callback) {
      callback(err);
    }
  });
}