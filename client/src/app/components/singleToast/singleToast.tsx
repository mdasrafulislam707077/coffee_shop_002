import DemoIcon from "@/app/assets/icon/cross.svg";

import ToastComponents from "./toastComponents";
interface SingleToastProps {
 
}
export default function SingleToast(props: SingleToastProps) {
  return (
    <>
      <ToastComponents />
      {props.children}
    </>
  );
}

