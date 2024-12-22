"use client";
import Branch from "@/app/components/branch/branch";
import Features from "@/app/components/features001/feature";
import Footer from "@/app/components/footer/footer";
import HomeDisplay from "@/app/components/home-display/homeDisplay";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
import Marketing001 from "@/app/components/market-info001/marketing";
import NewItem001 from "@/app/components/newItems001/newItems";
import PopulerItems from "@/app/components/populerItems/PopulerItems";
import ReviewBox from "@/app/components/review/review";
import useAuth from "@/app/hooks/isAuth/useAuth";
import injectUserInfo from "@/app/redux/userInfo/actionsName/inject_info";
import removeUserInfo from "@/app/redux/userInfo/actionsName/removeInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loginpad from "../loginPad/loginpad";
import useFavorite from "@/app/hooks/getfavorite/getFavorite";
export default function Home() {
  const dispatch = useDispatch();
  useFavorite()
  const [userInfo] = useAuth();
  useEffect(() => {
    if (userInfo.email && userInfo.name) {
      dispatch(injectUserInfo({ email: userInfo.email, name: userInfo.name }));
    } else {
      dispatch(removeUserInfo());
    }
  }, [userInfo]);
  return (
    <div className="h-full relative w-full bg-black">
      <Loginpad />
      <Marketing001 />
      <Branch />
      <Features />
      <NewItem001 />
      <ReviewBox />
      <PopulerItems />
      <Footer />
    </div>
  );
}
