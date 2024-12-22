import userLogin from "@/app/network/login/login";
import injectUserInfo from "@/app/redux/userInfo/actionsName/inject_info";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fonts } from "../fonts/font";
interface LoginProps {
  onChangePage: any;
  onClose: any;
}
export default function Login(props: LoginProps) {
  const [userInfo, setUserinfo] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="h-full relative flex-grow p-10">
      <div className={`${fonts.font_3.className} text-5xl font-extrabold mt-3`}>
        Login
      </div>
      <div className="mt-20"></div>
      <div className="w-full max-w-[450px] h-11 bg-gray-200 shadow-lg mt-2 relative ">
        <input
          type="email"
          name="email"
          placeholder="email"
          className={`h-full w-full relative outline-none border-none bg-transparent px-3 text-xl   ${fonts.font_4.className}`}
          id="email"
          value={userInfo.email}
          onChange={(e) => {
            setUserinfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>
      <div className="w-full max-w-[450px] h-11 bg-gray-200 mt-5 relative shadow-lg ">
        <input
          type="password"
          name="password"
          placeholder="password"
          className={`h-full w-full relative outline-none border-none bg-transparent px-3 text-xl   ${fonts.font_4.className}`}
          id="password"
          value={userInfo.password}
          onChange={(e) => {
            setUserinfo({ ...userInfo, password: e.target.value });
          }}
        />
      </div>
      {err ? (
        <div className="max-w-[450px] w-full relative text-center text-red-700 mt-4 text-sm">
          authentication failed
        </div>
      ) : null}
      <div
        className="w-full p-1 relative cursor-pointer mt-2 text-sm hover:text-pink-900"
        onClick={() => props.onChangePage()}
      >
        Create Account !!!
      </div>
      <div className="w-full flex">
        <div
          className={`px-10 relative py-2 bg-black text-white  ${fonts.font_4.className} mt-2 cursor-pointer`}
          onClick={() => {
            userLogin({ formInfo: userInfo }, (res) => {
              if (res?.data) {
                setUserinfo({
                  email: "",
                  password: "",
                })
                dispatch(
                  injectUserInfo({
                    name: res?.data?.name,
                    email: res?.data?.email,
                  })
                );
                localStorage.setItem("token", res?.data?.token);
                if (props.onClose) {
                  props.onClose();
                  setErr(false);
                }
              } else {
                setErr(true);
              }
            });
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}
