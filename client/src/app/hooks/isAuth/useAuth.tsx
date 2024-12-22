import config from "@/app/network/config";
import axios from "axios";
import { useEffect, useState } from "react";
export default function useAuth() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios({
        method: "get",
        url: `${config.HOST_SERVER_BASE_POINT}/auth/isLogin`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setUserInfo({
            email: res?.data?.email,
            name: res?.data?.name,
            init: true,
          });
        })
        .catch((err) => {
          setUserInfo({ email: null, name: null, init: true, });
        });
    } else {
      setUserInfo({ email: null, name: null, init: true, });
    }
  }, []);
  return [userInfo];
}
