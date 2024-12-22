import CrossIcon from "@/app/assets/icon/cross.svg";
import CoffeeLogo from "@/app/assets/icon/logo.svg";
import { injectProdect } from "@/app/redux/cart/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItems0001 from "../ListItems0001/ListItems0001";
import { fonts } from "../fonts/font";

interface SidebarProps {
  activeNav: boolean;
  onClose: any;
  isCart: boolean;
  onLogin:any

}
export default function Sidebar(props: SidebarProps) {
  const [cartItems, setCartItems] = useState([]);
  const cartInfo = useSelector((state) => state?.cartProdect?.cartOfList);
  const favoriteItems = useSelector((state) => state?.favoriteReducer?.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cartInfo);
  }, [cartInfo]);
  return (
    <div
      className={` hidden md:flex flex-col  bg-gray-950 max-w-[450px] w-full p-2 fixed top-0  right-0 h-screen   transition-transform z-[99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]
         ${props.activeNav ? "translate-x-0" : "translate-x-full"}`}
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
      <div className={`${fonts.font_1.className} px-3 text-white mb-2`}>
        {!props.isCart ? "Favorite" : "Cart"}
      </div>
      <div className="flex-grow w-full relative overflow-y-auto ">
        {props.isCart ? (
          <>
            {cartItems.map((element, index) => {
              return (
                <ListItems0001
                info={element}
                onCloseSlide={()=>props.onLogin()}
                  onDelete={() => {
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
          </>
        ) : (
          <>
            {favoriteItems.map((element, index) => {
              return <ListItems0001  name={element?.header} price={element?.price} key={index}  info={element}/>;
            })}
          </>
        )}
      </div>
      {props.isCart ? (
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
  );
}
