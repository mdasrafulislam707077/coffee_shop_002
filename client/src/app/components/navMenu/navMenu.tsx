"use client";
import DemoIcon from "@/app/assets/icon/blog.svg";
import ContactIcon from "@/app/assets/icon/contact.svg";
import CrossIcon from "@/app/assets/icon/cross.svg";
import HomeIcon from "@/app/assets/icon/home.svg";
import AboutIcon from "@/app/assets/icon/info.svg";
import ItemsIcon from "@/app/assets/icon/items.svg";
import CoffeeLogo from "@/app/assets/icon/logo.svg";
import ServiceIcon from "@/app/assets/icon/service.svg";
import { injectProdect } from "@/app/redux/cart/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../fonts/font";
import ListItems0001 from "../ListItems0001/ListItems0001";
const tabItems = {
  MENU: "MENU",
  CART: "CART",
  FAVORATE: "FAVORATE",
};
interface NavMenuProps {
  activeNav: boolean;
  onClose: any;
  onLogin:any
}
export default function NavMenu(props: NavMenuProps) {
  const [tabActiveItems, setTabActiveItems] = useState(tabItems.MENU);
  const cartInfo = useSelector((state) => state?.cartProdect?.cartOfList);
  const favoInfo = useSelector((state) => state?.favoriteReducer?.items);
  const dispatch = useDispatch()
  const userInfo  = useSelector((state) => state?.userInfo);
  return (
    <>
      <div
        className={`flex flex-col max-w-[450px] w-full fixed top-0 bg-gray-950 h-screen  lg:hidden transition-transform z-[99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999] ${
          props.activeNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex px-2 mt-2 min-h-16 mb-3">
          <div className="flex-grow flex  relative top-0 ">
            <div className="aspect-square h-10 relative cursor-pointer p-1 mr-2">
              <CoffeeLogo />
            </div>
            <div
              className={`text-white  translate-y-[44%]  ${fonts.font_1.className}`}
            >
              Coffee Cove
            </div>
          </div>
          <div
            className="w-10 h-10 relative cursor-pointer p-1"
            onClick={props.onClose}
          >
            <CrossIcon />
          </div>
        </div>
        <div className="w-full relative flex mb-4 pl-2 md:hidden">
          <div
            className={`${
              fonts.font_4.className
            } text-white cursor-pointer  mx-2 ${
              tabActiveItems == tabItems.MENU ? "border-b-2" : ""
            }`}
            onClick={() => {
              setTabActiveItems(tabItems.MENU);
            }}
          >
            Menu
          </div>
          <div
            className={`${
              fonts.font_4.className
            } text-white cursor-pointer  mx-2 ${
              tabActiveItems == tabItems.CART ? "border-b-2" : ""
            }`}
            onClick={() => {
              setTabActiveItems(tabItems.CART);
            }}
          >
            Cart
          </div>
          <div
            className={`${
              fonts.font_4.className
            } text-white cursor-pointer  mx-2 ${
              tabActiveItems == tabItems.FAVORATE ? "border-b-2" : ""
            }`}
            onClick={() => {
              if (userInfo?.email && userInfo?.name) {
                setTabActiveItems(tabItems.FAVORATE);
              }else{
                if (props.onLogin) {
                  props.onLogin()
                }
                
              }
              
            }}
          >
            Favorite
          </div>
        </div>
        <div className="w-full relative p-5 px-2 py-1  flex-grow flex flex-col overflow-auto pb-5 ">
          <div className="md:hidden h-full w-full">
            {tabActiveItems == tabItems.MENU ? (
              <ListOfMemuItems />
            ) : tabActiveItems == tabItems.CART ? (
              <div className=" h-full w-full pb-5">
                {cartInfo.map((element, index) => {
                  
                  return (
                    <ListItems0001
                    info={element}
                     onDelete={()=>{
                      const items = JSON.parse(
                        localStorage.getItem("cart_items")
                      );
                      const newItems = items?.filter((element2, index) => {
                        return element2?.prodectName != element?.prodectName;
                      });
  
                      dispatch(injectProdect(newItems));
                      localStorage.setItem(
                        "cart_items",
                        JSON.stringify(newItems)
                      );
                     }}
                      name={element?.prodectName}
                      prodectCount={element?.prodectCount}
                      price={element?.info?.price}
                      activeCart
                      key={index}
                      
                    />
                  );
                })}
              </div>
            ) : (
              <div className=" h-full w-full">
                {favoInfo.map(
                  (element, index) => {
                    return <ListItems0001  onCloseSlide={()=>props.onLogin()} name={element?.header} price={element?.price} key={index}  info={element}/>;
                  }
                )}
              </div>
            )}
          </div>
          <div className=" hidden md:block h-full w-full ">
            <ListOfMemuItems />
          </div>
        </div>
        {tabActiveItems == tabItems.CART ? (
          <div className=" text-white p-4 flex min-h-28">
            <div>
              <div className={`${fonts.font_5.className}  text-xl`}>
                Total-Prodect
              </div>
              <div className={`${fonts.font_5.className} text-sm`}>
                Quantity {"( 100 )"}
              </div>
              <div className={`${fonts.font_5.className}  text-sm`}>
                Price {"( 100$ )"}
              </div>
            </div>
            <div className="flex-grow flex justify-end items-center ">
              <div
                className={`px-6 py-2 relative bg-white text-black rounded-sm text-xs ${fonts.font_9.className} cursor-pointer`}
              >
                Buy
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
interface NavItemsProps {
  name: string;
  icon: any;
  href: string;
  active: boolean;
  mhref:Array
}
function NavItems(props: NavItemsProps) {
  const p = usePathname();
  return (
    !props.mhref?<Link href={props.href ?? "/"}>
      <div className="w-full relative mt-5 cursor-pointer ">
        <div className="w-full relative   flex items-center">
          <div className="aspect-square w-7 relative mr-3 ml-1">
            {props.icon ? <props.icon /> : <DemoIcon />}
          </div>
          <div className={`text-white ${fonts.font_4.className} text-lg`}>
            {props.name ?? "Blog"}
          </div>
          {props.active ? (
            <div className="w-1 h-5 bg-white absolute right-1 rounded-lg"></div>
          ) : null}
        </div>
      </div>
    </Link>:<div className="w-full relative mt-5 cursor-pointer flex flex-col group">
        <div className="w-full relative   flex items-center">
          <div className="aspect-square w-7 relative mr-3 ml-1">
            {props.icon ? <props.icon /> : <DemoIcon />}
          </div>
          <div className={`text-white ${fonts.font_4.className} text-lg`}>
            {props.name ?? "Blog"}
          </div>
          {props.active ? (
            <div className="w-1 h-5 bg-white absolute right-1 rounded-lg"></div>
          ) : null}
        </div>
        <div className={`w-full relative ${!props.active?"group-hover:block hidden":"block"}`}>
        {
          props?.mhref?.map((ele,index)=>{
            return <Link key={index} href={ele?.href} className={`text-white mt-3 ml-3 ${fonts.font_4.className} flex items-center`} >
                      <div className={`h-2 w-2 border border-white rotate-45 mr-2 ${p==ele?.href?"bg-white":""}`} >
                        
                      </div>
                      {ele?.name}
                    </Link>
          })
        }
        </div>
      </div>
  );
}














interface ListOfMemuItemsProps {}
function ListOfMemuItems() {
  const p = usePathname();
  return (
    <>
      <NavItems href="/" name="Home" icon={HomeIcon} active={p == "/"} />
      <NavItems
        href="/about"
        name="About Us"
        icon={AboutIcon}
        active={p == "/about"}
      />
      <NavItems
        href="/service"
        name="Service"
        icon={ServiceIcon}
        active={p == "/service"}
      />
      <NavItems
        href=""
        name="Items"
        icon={ItemsIcon}
        active={p == "/items/tea" || p == "/items/coffee"}
        mhref={[{
          name:"tea",
          href:"/items/tea",
          href:"/items/tea"
        },{
           name:"coffee",
          href:"/items/coffee",
          href:"/items/coffee"

        },]}
      />
      <NavItems
        href="/blog"
        name="Blog"
        icon={DemoIcon}
        active={p == "/blog"}
      />
      <NavItems
        href="/contact"
        name="Contacts"
        icon={ContactIcon}
        active={p == "/contact"}
      />
    </>
  );
}
