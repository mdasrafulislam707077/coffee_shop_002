import HomeDisplay from "@/app/components/home-display/homeDisplay";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
import Sidebar from "@/app/components/sidebar/sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Loginpad() {
  const [toastActive, setToastActive] = useState(false);
  const [sideActive, setSideActive] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((r) => r.userInfo);
  const [isCart,setCartStatus] = useState(false) 
  return (
    <>
      <Sidebar isCart={isCart} activeNav={sideActive} onLogin={()=>{
        setToastActive(true)
        setSideActive(false)
      }} onClose={()=>{
        setSideActive(false)
      }} />
      <LoginAndCreateToast
        activeToast={toastActive}
        onCloseToast={() => {
          setToastActive(false);
        }}
      />
      <HomeDisplay
        
        onLike={() => {
          if (!(userInfo.email && userInfo.name)) {
            setToastActive(true);
          } else {
            setSideActive(true)
            setToastActive(false);
            setCartStatus(false)

          }
        }}
        onCart={()=>{
          setSideActive(true)
            setToastActive(false);
            setCartStatus(true)
        }}
        onLogin={() => {
          setToastActive(true);
        }}
      />
    </>
  );
}
