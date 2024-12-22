"use client"
import React from "react"
import { useDispatch } from "react-redux";
import useFavorite from "@/app/hooks/getfavorite/getFavorite";
import useAuth from "@/app/hooks/isAuth/useAuth";
import { useEffect } from "react";
import injectUserInfo from "@/app/redux/userInfo/actionsName/inject_info";
import removeUserInfo from "@/app/redux/userInfo/actionsName/removeInfo";
interface InitProps{
    children:React.ReactNode
}
export default function Init(props:InitProps){
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
    return props.children
}


