import userCreate from "@/app/network/createUser/createuser";
import { useState } from "react";
import { fonts } from "../fonts/font";
interface LoginCreateAccountProps {
  onChangePage: any;
  onFormfinish: any;
}
export default function CreateAccount(props: LoginCreateAccountProps) {
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  return (
    <div className="h-full relative flex-grow p-10">
      <div className={`${fonts.font_3.className} text-5xl font-extrabold mt-3`}>
        Create User
      </div>
      <div className="mt-20"></div>
      <div className="w-full max-w-[450px] h-11 bg-gray-200 shadow-lg mt-2 relative ">
        <input
          type="name"
          name="name"
          placeholder="name"
          className={`h-full w-full relative outline-none border-none bg-transparent px-3 text-xl   ${fonts.font_4.className}`}
          id="name"
          value={formInfo.name}
          onChange={(e) => {
            setFormInfo({ ...formInfo, name: e.target.value });
          }}
        />
      </div>
      <div className="w-full max-w-[450px] h-11 bg-gray-200 mt-5 shadow-lg relative ">
        <input
          type="email"
          name="email"
          placeholder="email"
          className={`h-full w-full relative outline-none border-none bg-transparent px-3 text-xl   ${fonts.font_4.className}`}
          id="email"
          value={formInfo.email}
          onChange={(e) => {
            setFormInfo({ ...formInfo, email: e.target.value });
          }}
        />
      </div>
      <div className="w-full max-w-[450px] h-11 bg-gray-200 mt-5 relative shadow-lg ">
        <input
          value={formInfo.password}
          type="password"
          name="password"
          placeholder="password"
          className={`h-full w-full relative outline-none border-none bg-transparent px-3 text-xl   ${fonts.font_4.className}`}
          id="password"
          onChange={(e) => {
            setFormInfo({ ...formInfo, password: e.target.value });
          }}
        />
      </div>
      {error ? (
        <div className="text-center text-red-600 text-xs max-w-[450px] w-full mt-4">
          {error}
        </div>
      ) : null}
      <div
        className="w-full p-1 relative cursor-pointer mt-2 text-sm hover:text-pink-900"
        onClick={() => props.onChangePage()}
      >
        Login Account ??
      </div>
      <div className="w-full flex">
        <div
          className={`px-10 relative py-2 bg-black text-white  ${fonts.font_4.className} mt-2 cursor-pointer`}
          onClick={() => {
            userCreate({ formInfo: formInfo }, (res) => {
              if (res?.data) {
                setError(null);
                setFormInfo({
                  name: "",
                  email: "",
                  password: "",
                });
                if (props.onFormfinish) {
                  props.onFormfinish();
                }
              } else {
                if (res?.response) {
                  setError(res?.response?.data?.error ?? "");
                  
                  
                } else {
                  setError(
                    `Name must be at least 2 characters long, password must be exactly 8 characters long, and email must be unique.`
                  );
                }
              }
            });
          }}
        >
          Create
        </div>
      </div>
    </div>
  );
}
