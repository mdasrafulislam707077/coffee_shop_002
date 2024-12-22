"use client";
import DemoIcon from "@/app/assets/icon/cross.svg";
import { singleToastDeactive } from "@/app/redux/toats/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../fonts/font";
export default function ToastComponents() {
  const selector = useSelector((select) => select?.singleToast);
  const dispatch = useDispatch();
  const [trackTimer, setTracktimer] = useState(null);
  useEffect(() => {
    if (selector?.toastActive == true) {
      const setimeTrack = setTimeout(() => {
        dispatch(singleToastDeactive());
      }, 2000);
      setTracktimer(setimeTrack);
    } else {
      if (trackTimer != null) {
        clearTimeout(trackTimer);
      }
    }
  }, [selector?.toastActive]);

  return (
    <div
      className={`fixed right-4  w-[500px] bg-slate-900 top-4 rounded-md pb-10 px-5 ${
        selector?.toastActive ? "" : "hidden"
      }  p-2 z-[999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]`}
    >
      <div className="font-mono text-3xl flex justify-end text-white ">
        <div
          className="cursor-pointer rotate-45 font-extrabold"
          onClick={() => {
            dispatch(singleToastDeactive());
            clearTimeout(trackTimer);
          }}
        >
          +
        </div>
      </div>
      <div className="w-auto h-auto flex">
        <div className="h-8 aspect-square relative mr-2">
          {selector.icon ? (
            <selector.icon fill="white" />
          ) : (
            <DemoIcon fill="white" />
          )}
        </div>
        <div className={`text-2xl ${fonts.font_4.className} text-white`}>
          {selector.header ?? "unset"}
        </div>
      </div>
      <div className={`text-xs text-white mt-2`}>{selector.description}</div>
    </div>
  );
}
