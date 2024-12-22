import CoffeeLogo from "@/app/assets/icon/logo copy.svg";
import { useState } from "react";
import Toast from "../toast/toast";
import CreateAccount from "./create";
import Login from "./login";
interface LoginAndCreateToastProps {
  activeToast: boolean;
  onCloseToast: any;
}

export default function LoginAndCreateToast(props: LoginAndCreateToastProps) {
  const [loginActive, setloginActive] = useState(true);
  return (
    <Toast className=" p-1 md:p-0" activetoast={props.activeToast} center>
      <div className={` w-full max-w-[1100px] md:h-[650px] bg-white drop-shadow-md pb-10 md:pb-0 flex flex-col  `}>
        <div className="w-full relative flex justify-end pr-5 mt-2">
          <div
            className="rotate-45 font-extrabold h-fit w-fit text-3xl cursor-pointer"
            onClick={() => {
              setloginActive(true);
              if (props.onCloseToast) {
                props.onCloseToast();
              }
            }}
          >
            +
          </div>
        </div>
        <div className="w-full relative flex flex-grow flex-col md:flex-row">
          <div className="h-full relative px-2 flex items-center md:pl-20 ">
            <div className="h-[110px] md:h-[250px] aspect-square  m-auto md:m-0 relative -translate-y-[20%] md:-translate-y-[50%]">
              <CoffeeLogo fill="black" />
            </div>
          </div>
          {loginActive ? (
            <Login
              onClose={() => {
                if (props.onCloseToast) {
                  props.onCloseToast();
                }
              }}
              onChangePage={() => {
                setloginActive(!loginActive);
              }}
            />
          ) : (
            <CreateAccount
              onFormfinish={() => {
                setloginActive(!loginActive);
              }}
              onChangePage={() => {
                setloginActive(!loginActive);
              }}
            />
          )}
        </div>
      </div>
    </Toast>
  );
}
