"use client";
import CartIcon from "@/app/assets/icon/cart-large-minimalistic-svgrepo-com.svg";
import FavoIcon from "@/app/assets/icon/favorite-svgrepo-com (1).svg";
import CoffeeLogo from "@/app/assets/icon/logo.svg";
import LogOutIcon from "@/app/assets/icon/logout.svg";
import MenuIcon from "@/app/assets/icon/menu.svg";
import LoginIcon from "@/app/assets/icon/noun-login-6292758.svg";
import SearchIcon from "@/app/assets/icon/search-icon.svg";
import { searchFatch } from "@/app/network/search/search";
import removeUserInfo from "@/app/redux/userInfo/actionsName/removeInfo";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../fonts/font";
import Loading from "../loading/loading";
import Toast from "../toast/toast";

interface NavheaderProps {
  bgTransparent: boolean;
  hidddenLink: boolean;
  onMenuClick: any;
  onloginActive: any;
  onLike: any;
  onCart: any;
}
export default function Navheader(props: NavheaderProps) {
  const userInfo = useSelector((state) => state.userInfo);
  const cartInfo = useSelector((state) => state?.cartProdect?.cartOfList);
  const favoInfo = useSelector((state) => state?.favoriteReducer?.items);
  const p = usePathname();
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = useState(false);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItems] = useState([]);
  const [timeTracker, setTimeTracker] = useState(null);
  const navigate = useRouter();
  const [notFound, setNotfound] = useState(false);

  return (
    <div className="w-full relative ">
      <Toast className="w-full" center activetoast={searchBox}>
        <div className=" w-full max-w-[700px] min-h-[350px] bg-slate-800 rounded-md mx-1 px-1">
          <div className="w-full flex justify-end items-center px-2 pt-2 pr-3">
            <div
              className="rotate-45 font-extrabold text-2xl text-white cursor-pointer"
              onClick={() => {
                setSearchBox(false);
                setSearchItems([]);
                setSearch("");
              }}
            >
              +
            </div>
          </div>
          <div className="h-10 bg-slate-900 rounded-md  w-full max-w-[450px] m-auto mt-10 flex">
            <div className="h-10 aspect-square relative  p-2">
              <SearchIcon fill="white" stroke="white" />
            </div>
            <div className="h-10 relative w-full  bg-transparent">
              <input
                type="text"
                name=""
                className={`w-full h-full relative bg-transparent border-none outline-none text-white  ${fonts.font_5.className}`}
                placeholder="Search"
                id=""
                value={search}
                onChange={(e) => {
                  setSearch(e.target?.value);
                  setSearchItems([]);
                  setNotfound(false);
                  if (timeTracker) {
                    clearTimeout(timeTracker);
                  }
                  const timeTrack = setTimeout(() => {
                    if (e.target?.value.length != 0) {
                      searchFatch(e.target?.value, (res) => {
                        if (res.data) {
                          setSearchItems(res.data?.items);
                          if (res.data?.items?.length==0) {
                            setNotfound(true);
                          }
                        }
                      });
                    }
                  }, 2000);

                  setTimeTracker(timeTrack);
                }}
              />
            </div>
          </div>
          <div className=" w-full max-w-[450px] max-h-[450px]  mt-2  m-auto overflow-y-auto">
            {notFound ? (
              <div
                className={`h-full w-full flex justify-center items-center relative p-10 text-white ${fonts.font_5.className}`}
              >
                {"Not-Found -:("}
              </div>
            ) : searchItem.length == 0 && search.length != 0 ? (
              <div className="h-full w-full flex justify-center items-center relative p-10">
                <Loading />
              </div>
            ) : (
              searchItem.map((element, index) => (
                <div
                  key={index}
                  className="min-h-20 w-full  flex items-center bg-white mb-1 cursor-pointer px-1"
                  onClick={() => {
                    navigate.push(`/review/${element.id}`, { scroll: true });
                  }}
                >
                  <div className="h-28 aspect-square relative ">
                    <div className="h-full w-full absolute bg-gray-900  animate-pulse"></div>
                    <Image
                      src={`${element?.image?.host}${element?.image?.path}${element?.image?.webUrl}`}
                      alt=""
                      className="relative"
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-grow h-full px-1">
                    <div className={`${fonts.font_5.className}`}>
                      {element?.header}
                    </div>
                    <div className="text-xs">
                      {element?.description.length >= 170
                        ? `${element?.description.slice(0, 170)}...`
                        : element?.description}
                    </div>
                    <div className="text-xs mt-1 mb-2">{element?.price}$</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Toast>
      <div
        className={` h-28  w-full left-0 top-0 absolute  ${
          props.bgTransparent ? "" : "bg-black"
        } bg-opacity-50`}
      ></div>
      <div
        className={`w-full   h-28 px-1 sm:px-12 md:px-20 flex bg-transparent z-20 relative justify-between `}
      >
        <div className="pl-5 sm:pl-0 w-[33.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333%]   flex p-2 ">
          <div className="pt-3 sm:pt-0  aspect-square w-10 sm:w-14 md:w-16 ">
            <CoffeeLogo fill="white" />
          </div>
        </div>
        <div
          className={`${
            props.hidddenLink ? "flex" : "hidden"
          } w-[33.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333%]`}
        ></div>
        <div
          className={`z-20 w-[33.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333%] h-full  ${
            !props.hidddenLink ? "lg:flex hidden" : "hidden"
          }  justify-center items-center coffee-font ${
            fonts.font_1.className
          } `}
        >
          <Link
            href="/"
            className={`mx-3 text-xs cursor-pointer ${
              p == "/" ? "text-orange-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`mx-3 text-xs cursor-pointer whitespace-nowrap ${
              p == "/about" ? "text-orange-400" : ""
            }`}
          >
            ABOUT US
          </Link>
          <Link
            href="/service"
            className={`mx-3 text-xs cursor-pointer ${
              p == "/service" ? "text-orange-400" : ""
            }`}
          >
            SERVICES
          </Link>
          <div
            className={`mx-3 text-xs cursor-pointer flex justify-center group ${
              p == "/items/tea" || p == "/items/coffee" ? "text-orange-400" : ""
            }`}
          >
            <div className="absolute hidden group-hover:flex -bottom-10 bg-white  w-40 h-20 flex-col justify-center items-center">
              <Link
                href="/items/tea"
                className={`text-black w-full py-2 text-center uppercase ${
                  p == "/items/tea" ? "text-orange-400" : ""
                }`}
              >
                tea
              </Link>
              <hr className="w-full" />
              <Link
                href="/items/coffee"
                className={`text-black w-full py-2 text-center uppercase ${
                  p == "/items/coffee" ? "text-orange-400" : ""
                }`}
              >
                coffee
              </Link>
            </div>
            <div>items</div>
          </div>
          <Link
            href="/blog"
            className={`mx-3 text-xs cursor-pointer ${
              p == "/blog" ? "text-orange-400" : ""
            }`}
          >
            BLOG
          </Link>
          <Link
            href="/contact"
            className={`mx-3 text-xs cursor-pointer ${
              p == "/contact" ? "text-orange-400" : ""
            }`}
          >
            CONTACTS
          </Link>
        </div>
        <div className="w-[38%] lg:w-[33.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333%] h-full  flex items-center justify-end">
          <div
            className="h-7 w-7  mx-2 cursor-pointer p-[4px] "
            onClick={() => {
              setSearchBox(true);
            }}
          >
            <SearchIcon fill="white" stroke="white" />
          </div>

          <div
            className="h-7 w-7  mx-2 cursor-pointer relative hidden md:block"
            onClick={() => {
              if (props.onCart) {
                props.onCart();
              }
            }}
          >
            {cartInfo.length > 0 ? (
              <div className="h-5 w-5 flex items-center justify-center bg-gray-600 absolute text-[9px] rounded-full text-white -right-2 -top-1 ">
                {cartInfo.length}
              </div>
            ) : null}
            <CartIcon />
          </div>
          <div
            className="h-7 w-7  mx-2 cursor-pointer p-[4px] relative hidden md:block"
            onClick={() => {
              if (props.onLike) {
                props.onLike();
              }
            }}
          >
            {userInfo.email && userInfo.name && favoInfo.length > 0 ? (
              <div className="h-5 w-5 flex items-center justify-center bg-gray-600 absolute text-[9px] rounded-full text-white -right-2 -top-1 ">
                {favoInfo.length}
              </div>
            ) : null}
            <FavoIcon stroke="white" />
          </div>

          {!(userInfo.email && userInfo.name) ? (
            <div
              className="h-7 w-7   cursor-pointer scale-125 mx-3 hidden md:block"
              onClick={() => props.onloginActive()}
            >
              <LoginIcon fill="white" stroke="white" />
            </div>
          ) : (
            <div
              className="h-7 w-7 p-[2px]  cursor-pointer scale-125 mx-3 hidden md:flex  justify-center items-center"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(removeUserInfo());
              }}
            >
              <LogOutIcon fill="white" stroke="white" />
            </div>
          )}
          <div
            className="aspect-square w-8  mx-2 cursor-pointer p-[4px] block lg:hidden"
            onClick={props.onMenuClick}
          >
            <MenuIcon fill="white" stroke="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
