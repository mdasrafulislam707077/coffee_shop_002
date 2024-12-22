"use client";
import useAuth from "@/app/hooks/isAuth/useAuth";
import getProdect from "@/app/network/getProdect/getProdect";
import injectUserInfo from "@/app/redux/userInfo/actionsName/inject_info";
import ProdectReview from "@/app/view/prodectView/prodectreview";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function ReviewPage() {
  const { prodectid } = useParams();
  const [data, setData] = useState({ prodects: null, prodect: null });
  const [userInfo] = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.email && userInfo.name) {
      dispatch(
        injectUserInfo({
          name: userInfo?.name,
          email: userInfo?.email,
        })
      );
    }
  }, [userInfo]);
  useEffect(() => {
    if (userInfo?.init) {
      getProdect({
        email: userInfo.email,
        prodectId: prodectid,
        callback: (value) => {
          if (value.data) {
            setData(value.data);
          }
        },
      });
    }
  }, [prodectid, userInfo.email, userInfo.init]);
  return data.prodect && data.prodects ? (
    <ProdectReview isLike={data.isFavo} prodectDetails={data.prodect} prodectItems={data.prodects} />
  ) : null;
}
