"use client";
import Bg from "@/app/assets/bg/bg4.png";
import Image1 from "@/app/assets/coffee/andres-vera-BewKTZMv7V0-unsplash.jpg";
import AddCartIcon from "@/app/assets/icon/cart-plus-svgrepo-com.svg";
import LikeIcon from "@/app/assets/icon/favorite-svgrepo-com (1).svg";
import ActiveLikeIcon from "@/app/assets/icon/favorite-svgrepo-com (2).svg";
import OptionIcon from "@/app/assets/icon/option.svg";
import PaymentBox from "@/app/components/dialogBox/paymentBox";
import PaymentConfirmToast from "@/app/components/dialogBox/paymentConfirm";
import { fonts } from "@/app/components/fonts/font";
import Footer from "@/app/components/footer/footer";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
import Navheader from "@/app/components/nav-header/navHeader";
import ProdectCard from "@/app/components/prodectCard/card";
import RatingComponent from "@/app/components/starbar/starbar";
import Toast from "@/app/components/toast/toast";
import favoritePost from "@/app/network/favorite/favorite";
import {
  prodectBuy,
  prodectCheck,
} from "@/app/network/prodect_process/prodect_process";
import { injectProdect } from "@/app/redux/cart/actions";
import injectFavoriteItems from "@/app/redux/favorite/action";
import { singleToastActive } from "@/app/redux/toats/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ToastType = {
  PAYMENT_INFO: "PAYMENT_INFO",
  BUY_PROCESS: "BUY_PROCESS",
};

interface ProdectReviewProps {
  prodectDetails: Object;
  prodectItems: Array;
  isLike: boolean;
}
export default function ProdectReview(props: ProdectReviewProps) {
  const navigate = useRouter();
  const [prodectLike, setProdectLike] = useState(props?.isLike ?? false);
  const [imageList, setImageList] = useState([]);
  const [activeImage, setActiveImage] = useState({});
  const [toastActive, setToastActive] = useState(false);
  const [activeLoginToast, setActiveLoginToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const userInfo = useSelector((state) => state.userInfo);
  const favoItem = useSelector((state) => state.favoriteReducer?.items);
  const tokenInfo = useSelector((state) => state.tokenReducers);
  const dispatch = useDispatch();
  const [toastType, setToastType] = useState(null);
  const [pymentMsg, setPaymentMsg] = useState(null);
  const [activeButtons, setActiveButtons] = useState(null);
  const [tokenStore, setTokenStore] = useState(null);

  useEffect(() => {
    if (props.prodectDetails) {
      setImageList([
        { ...props?.prodectDetails?.mainImage },
        ...props.prodectDetails?.imageItems,
      ]);
      setActiveImage({ ...props?.prodectDetails?.mainImage });
    }
  }, [props.prodectDetails]);
  return (
    <div className="w-full relative">
      <LoginAndCreateToast
        activeToast={activeLoginToast}
        onCloseToast={() => {
          setActiveLoginToast(false);
        }}
      />
      <Toast center activetoast={toastType}>
        {toastType == ToastType.PAYMENT_INFO ? (
          <PaymentBox
            onSelectToken={(ele) => {
              if (ele) {
                setTokenStore(ele.token);
              }
            }}
            onClose={() => {
              setToastType(null);
            }}
          />
        ) : null}
        {toastType == ToastType.BUY_PROCESS ? (
          <PaymentConfirmToast
            activeButton={activeButtons}
            message={pymentMsg}
            onCheck={() => {
              prodectCheck(
                {
                  id: props.prodectDetails?._id,
                  count: cartCount,
                  price: props.prodectDetails.price,
                  discount: props.prodectDetails.discount,
                },
                (res) => {
                  if (res.data) {
                    if (res.data.errMsg) {
                      setPaymentMsg(res.data.errMsg);
                    } else {
                      setPaymentMsg(
                        "Everything looks good! Are you sure you want to buy it?"
                      );
                      setActiveButtons(true);
                    }
                  } else {
                    setPaymentMsg("server-side issue.try again later");
                  }
                }
              );
            }}
            onYes={() => {
              setActiveButtons(false);
              prodectBuy(
                {
                  id: props.prodectDetails?._id,
                  count: cartCount,
                  price: props.prodectDetails.price,
                  discount: props.prodectDetails.discount,
                  token: tokenStore,
                  email: userInfo.email,
                },
                (res) => {
                  if (res.data) {
                    if (res.data.errMsg) {
                      setPaymentMsg(res.data.errMsg);
                    } else {
                      setPaymentMsg("Product purchased successfully...");
                      setTimeout(() => {
                        setToastType(null);
                        setPaymentMsg(null);
                        setActiveButtons(false);
                      }, 2000);
                    }
                  }
                }
              );
            }}
            onClose={() => {
              setToastType(null);
              setPaymentMsg(null);
              setActiveButtons(false);
            }}
            onNo={() => {
              setPaymentMsg(null);
              setActiveButtons(false);

              setToastType(null);
            }}
          />
        ) : null}
      </Toast>

      <Navheader
        hidddenLink
        onloginActive={() => {
          setActiveLoginToast(true);
        }}
        onLike={() => {
          if (!(userInfo.email && userInfo.name)) {
            setActiveLoginToast(true);
          } else {
          }
        }}
      />
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-full h-auto  relative overflow-hidden ">
          <Image
            src={Bg}
            layout="fill"
            objectFit="cover"
            alt="cover"
            className="absolute h-full w-full opacity-30"
          />
          <div className="relative max-w-[1600px] w-full mt-20 flex justify-center items-center lg:items-start m-auto flex-col lg:flex-row">
            <div className="w-full md:w-[700px] lg:w-1/2 h-full relative flex justify-center items-center flex-col p-3 xl:p-0 flex-grow ">
              <div className=" aspect-square xl:w-[600px] w-full  relative p-4 xl:p-0">
                <Image
                  src={
                    activeImage.webUrl
                      ? `${activeImage.host}${activeImage?.path}${activeImage.webUrl}`
                      : Image1
                  }
                  layout="fill"
                  objectFit="cover"
                  alt="cover"
                  className=" h-full w-full "
                />
              </div>
              <div className="h-auto w-full relative py-2 flex justify-center flex-wrap">
                {imageList.map((element, index) => {
                  return (
                    <div
                      key={index}
                      className={`h-20 w-20 bg-slate-400 rounded-sm mx-2 cursor-pointer relative mt-1${
                        `${element?.host}${element?.path}${element?.webUrl}` ==
                        `${activeImage?.host}${activeImage?.path}${activeImage?.webUrl}`
                          ? "border-2"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveImage(element);
                      }}
                    >
                      <div className="absolute h-full w-full bg-slate-800 animate-pulse"></div>
                      <Image
                        src={
                          element?.webUrl
                            ? `${element?.host}${element?.path}${element?.webUrl}`
                            : Image1
                        }
                        layout="fill"
                        objectFit="cover"
                        alt="cover"
                        className=" h-full w-full "
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-full relative lg:w-1/2 p-3 lg:p-0">
              <div
                className={`${fonts.font_3.className} text-3xl lg:text-5xl text-white`}
              >
                {props.prodectDetails?.header}
              </div>
              <div
                className={`${fonts.font_11.className} text-white text-xs sm:text-sm xl:text-base w-full xl:w-[95%] 2xl:w-[80%] mt-5 `}
              >
                {props.prodectDetails?.description}
              </div>
              <br />
              <div className="w-[80%]">
                <span
                  className={`${fonts.font_3.className} text-3xl text-white`}
                >
                  price
                </span>{" "}
                <span className={`${fonts.font_11.className} text-white ml-2`}>
                  {props.prodectDetails.price}${" "}
                  {props.prodectDetails.discount ? (
                    <strike>
                      (
                      {props.prodectDetails.price +
                        (props.prodectDetails.price +
                          props.prodectDetails?.discount / 100)}
                      )
                    </strike>
                  ) : null}
                </span>
              </div>
              <div className="w-[80%]">
                <span
                  className={`${fonts.font_3.className} text-3xl text-white`}
                >
                  status
                </span>{" "}
                <span className={`${fonts.font_11.className} text-white ml-2`}>
                  {props.prodectDetails?.quantity ? "In Stock" : "out of stock"}
                </span>
              </div>
              <div className="w-[80%] flex items-center">
                <span
                  className={`${fonts.font_3.className} text-3xl text-white`}
                >
                  rate
                </span>{" "}
                <span className={`${fonts.font_11.className} text-white ml-2`}>
                  <RatingComponent />
                </span>
              </div>

              <div className="w-[80%]">
                <span
                  className={`${fonts.font_3.className} text-3xl text-white`}
                >
                  review
                </span>{" "}
                <span
                  className={`${fonts.font_11.className} text-white ml-2 cursor-pointer hover:underline`}
                >
                  comment(12)
                </span>
              </div>

              <div className="w-fit relative flex mt-2">
                <div
                  className="h-10 w-10 relative text-white cursor-pointer border-2 border-white flex justify-center items-center text-2xl hover:scale-[0.99] transition-all pb-1"
                  onClick={() =>
                    setCartCount((value) => {
                      return value + 1;
                    })
                  }
                >
                  +
                </div>
                <div className="w-14 h-10  ">
                  <input
                    type="number"
                    name=""
                    id=""
                    value={cartCount}
                    className="h-full w-full relative border-2 bg-transparent flex justify-center items-center text-white text-center outline-none"
                    min={0}
                  />
                </div>
                <div
                  className="h-10 w-10 relative text-white cursor-pointer border-2 border-white flex justify-center items-center text-2xl hover:scale-[0.99] transition-all pb-2"
                  onClick={() =>
                    setCartCount((value) => {
                      if (value <= 0) {
                        return 0;
                      }
                      return value - 1;
                    })
                  }
                >
                  -
                </div>
              </div>

              <div className="w-full mt-4 flex items-center ">
                <div
                  className={`h-10 w-36 bg-white mr-2 rounded-sm flex items-center justify-center ${fonts.font_7.className} cursor-pointer`}
                  onClick={() => {
                    if (!(userInfo.email && userInfo.name)) {
                      setActiveLoginToast(true);
                    } else {
                      setToastType(ToastType.BUY_PROCESS);
                    }
                  }}
                >
                  Buy
                </div>
                <div
                  className={`h-10 w-36 bg-white mr-2 rounded-sm flex items-center justify-center ${fonts.font_7.className} cursor-pointer`}
                  onClick={() => {
                    try {
                      let listOfProdect = localStorage.getItem("cart_items");

                      if (!listOfProdect) {
                        const addItems = [
                          {
                            prodectName: props.prodectDetails?.header,
                            prodectCount: cartCount,
                            info: {
                              ...props.prodectDetails,
                            },
                          },
                        ];
                        dispatch(injectProdect(addItems));
                        localStorage.setItem(
                          "cart_items",
                          JSON.stringify(addItems)
                        );
                      } else {
                        listOfProdect = JSON.parse(listOfProdect);
                        const newItems = listOfProdect?.find(
                          (element2, index2) => {
                            return (
                              element2.prodectName ==
                              props?.prodectDetails?.header
                            );
                          }
                        );
                        if (!newItems) {
                          const addItems = [
                            ...listOfProdect,

                            {
                              prodectName: props.prodectDetails?.header,
                              prodectCount: cartCount,
                              info: {
                                ...props.prodectDetails,
                              },
                            },
                          ];
                          dispatch(injectProdect(addItems));
                          localStorage.setItem(
                            "cart_items",
                            JSON.stringify(addItems)
                          );
                        } else {
                          const newItems = listOfProdect?.map((ele2, index) => {
                            if (
                              ele2?.prodectName == props.prodectDetails?.header
                            ) {
                              return {
                                prodectName: props.prodectDetails?.header,
                                prodectCount: cartCount,
                                info: {
                                  ...props.prodectDetails,
                                },
                              };
                            }
                            return ele2;
                          });
                          dispatch(injectProdect(newItems));
                          localStorage.setItem(
                            "cart_items",
                            JSON.stringify(newItems)
                          );
                        }
                      }

                      dispatch(
                        singleToastActive({
                          icon: AddCartIcon,
                          header: props.prodectDetails.header,
                          description: props.prodectDetails.description,
                        })
                      );
                    } catch (error) {
                      const addItems = [
                        {
                          prodectName: props.prodectDetails?.header,
                          prodectCount: cartCount,
                          info: {
                            ...props.prodectDetails,
                          },
                        },
                      ];
                      dispatch(injectProdect(addItems));
                      localStorage.setItem(
                        "cart_items",
                        JSON.stringify(addItems)
                      );
                    }
                  }}
                >
                  Add-Cart
                </div>

                <div
                  className="h-6 w-6 ml-2 cursor-pointer"
                  onClick={() => {
                    if (!(userInfo.email && userInfo.name)) {
                      setActiveLoginToast(true);
                    } else {
                      favoritePost(
                        {
                          email: userInfo.email,
                          prodect_name: props.prodectDetails?.header,
                          convert: !prodectLike,
                          id: props.prodectDetails?._id,
                        },
                        (res) => {
                          if (res.data) {
                            setProdectLike(res.data?.convert);
                            if (res.data?.convert) {
                              dispatch(
                                injectFavoriteItems([
                                  ...favoItem,
                                  {
                                    _id: props.prodectDetails?._id,
                                    price: props.prodectDetails?.price,
                                    quantity: props.prodectDetails?.quantity,
                                    header: props.prodectDetails?.header,
                                  },
                                ])
                              );
                            } else {
                              const newItems = favoItem?.filter(
                                (element, index) =>
                                  element._id != props.prodectDetails?._id
                              );
                              dispatch(injectFavoriteItems([...newItems]));
                            }
                          }
                        }
                      );
                    }
                  }}
                >
                  {!prodectLike ? (
                    <LikeIcon fill="white" />
                  ) : (
                    <ActiveLikeIcon fill="white" />
                  )}
                </div>
                {userInfo.email && userInfo.name ? (
                  <div
                    className="h-7 w-7 ml-4 cursor-pointer"
                    onClick={() => {
                      setToastType(ToastType.PAYMENT_INFO);
                    }}
                  >
                    <OptionIcon fill="white" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] w-full relative m-auto mt-20">
        <div
          className={`text-center capitalize text-4xl lg:text-7xl ${fonts.font_7.className} text-white mb-5`}
        >
          suggesting Prodect
        </div>
        <div className="w-full relative p-2 px-4 grid  grid-cols-prodect001-auto-fit gap-5 ">
          {props?.prodectItems?.map((element, index) => {
            return (
              <ProdectCard
                marginOff
                widthFull
                id={element._id}
                onDisplay={(e) => {
                  navigate.push(`/review/${e.prodectId}`, { scroll: true });
                }}
                key={index}
                image={`${element?.mainImage?.host}${element?.mainImage?.path}${element?.mainImage?.webUrl}`}
                header={element.header}
                des={element.description}
                price={element.price}
                discount={element.discount}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
