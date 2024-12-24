import LoadingGif from "@/app/assets/fig/coffee-beans.gif";
import Image from "next/image";
import { fonts } from "../fonts/font";
import { useEffect } from "react";
interface PaymentConfirmToastProps {
  onClose: any;
  message: string;
  onYes: any;
  onNo: any;
  onCheck:any
  activeButton:any
}
export default function PaymentConfirmToast(props: PaymentConfirmToastProps) {
    useEffect(()=>{
        if (props.onCheck) {
            props.onCheck()
        }
    },[])
  return (
    <div className="max-w-[900px] w-full relative aspect-video bg-white shadow-lg flex flex-col">
      <div className="w-full relative p-2 pr-3 flex items-end justify-end cursor-pointer">
        <div
          className="rotate-45 text-3xl w-fit h-fit text-black font-extrabold"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}
        >
          +
        </div>
      </div>
      <div className="w-full relative flex justify-center mt-10">
        <div className="relative h-40 w-40 ">
          <Image
            src={LoadingGif}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
      <div
        className={`w-full relative animate-pulse ${fonts.font_1.className} text-center mt-10`}
      >
        {props.message ?? "Check and Verifying prodect details..."}
      </div>
      {props.activeButton?<div className="w-full relative flex justify-center mt-8">
        <div
          className={`h-10 w-20  bg-green-500 flex justify-center items-center mr-10 ${fonts.font_1.className} text-white rounded-sm shadow-sm cursor-pointer text-xs hover:scale-95 transition-all`}
          onClick={()=>props.onYes()}
        >
          Yes
        </div>
        <div
          className={`h-10 w-20 bg-red-500 flex justify-center items-center mr-10 ${fonts.font_1.className} text-white  rounded-sm shadow-sm cursor-pointer text-xs hover:scale-95 transition-all`}
          onClick={()=>props.onNo()}
        >
          No
        </div>
      </div>:null}
    </div>
  );
}
