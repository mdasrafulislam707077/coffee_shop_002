import DeleteIcon from "@/app/assets/icon/delete.svg";
import TokenIcon from "@/app/assets/icon/token.svg";
import TransitionIcon from "@/app/assets/icon/wallet-svgrepo-com.svg";
import {
  createPaymentToken,
  deleteToken,
  getToken,
  getlistOfPaymentToken,
} from "@/app/network/payment/getToken";
import {
  activeToken,
  injectToken,
  removeToken,
} from "@/app/redux/token/payment/action";
import actionName from "@/app/redux/token/payment/actionName";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../fonts/font";
interface PaymentBoxProps {
  onClose: any;
  onSelectToken: any;
}
export default function PaymentBox(props: PaymentBoxProps) {
  const tokenInfo = useSelector((state) => state.tokenReducers);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [tokenGen, setTokenGen] = useState(null);
  const [paymentToken, setPaymentToken] = useState("");
  const [selectToken, setSelectToken] = useState([]);
  useEffect(() => {
    if (userInfo.email) {
      getlistOfPaymentToken({ email: userInfo.email }, (res) => {
        if (res.data) {
          if (res.data.item.items) {
            setSelectToken(res?.data?.item?.record ?? []);
            dispatch(
              injectToken({
                type: actionName.ALL_TOKEN_INJECT,
                list: res.data.item.items,
              })
            );
          }
        }
      });
    }
  }, [userInfo.email]);
  return (
    <div className="aspect-video w-[1200px] bg-white shadow-lg flex flex-col max-h-[58vh]">
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
      <div className="w-full relative h-40 ">
        <div className="w-40 relative ml-4">
          <TransitionIcon />
        </div>
      </div>
      <div className="w-full relative px-3 flex flex-grow">
        <div className="w-1/2 relative  flex flex-col">
          <h3 className={`${fonts.font_1.className} flex justify-between`}>
            <div>Token</div>
            <div
              className="font-extrabold cursor-pointer text-black text-2xl"
              onClick={() => {
                getToken(
                  {
                    email_client: userInfo.email,
                  },
                  (res) => {
                    if (res?.data) {
                      setTokenGen(res?.data?.token);
                    }
                  }
                );
              }}
            >
              +
            </div>
          </h3>
          <div className="w-full relative pr-5 flex-grow overflow-y-auto max-h-[450px] mb-2">
            {!tokenGen ? (
              tokenInfo?.listOfToken?.list?.map((ele, index) => {
                const time = Date.now();
                return (
                  <div
                    key={index}
                    className="w-full relative bg-slate-900 mt-2 cursor-pointer rounded-md text-white pb-2"
                    onClick={() => {}}
                  >
                    <div className="w-full relative flex items-center">
                      <div className="h-12 aspect-square px-2  flex items-center">
                        <TokenIcon fill="white" />
                      </div>
                      <div className={`${fonts.font_7.className} h-fit`}>
                        Token-{index + 1}
                      </div>
                      <div className="flex-grow  flex justify-end">
                        <label htmlFor={`${time}`} className="flex">
                          <div className="mr-1">
                            <input
                              checked={
                                ele.token == tokenInfo?.activeToken?.token
                              }
                              type="checkbox"
                              name=""
                              id=""
                              className="bg-transparent cursor-pointer"
                              onChange={() => {
                                if (
                                  ele?.token != tokenInfo?.activeToken?.token
                                ) {
                                  dispatch(activeToken(ele));
                                  if (props.onSelectToken) {
                                    props.onSelectToken(ele);
                                  }
                                } else {
                                  dispatch(removeToken());
                                  if (props.onSelectToken) {
                                    props.onSelectToken(null);
                                  }
                                }
                              }}
                            />
                          </div>
                          <div
                            className={`${fonts.font_4.className}  mr-1`}
                            id={`${time}`}
                          >
                            active
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="px-3 text-ellipsis overflow-hidden whitespace-nowrap text-xs flex justify-between">
                      <div className="w-full relative text-ellipsis overflow-hidden flex-grow">
                        {ele.token}
                      </div>
                      <div
                        className=" aspect-square relative min-h-6 max-h-6 h-6 p-1"
                        onClick={() => {
                          deleteToken(
                            { email: userInfo.email, token: ele.token },
                            (res) => {
                              if (res.data) {
                                if (res.data.item) {
                                  dispatch(
                                    injectToken({
                                      type: actionName.ALL_TOKEN_INJECT,
                                      list: res.data.item.items,
                                    })
                                  );
                                }
                              }
                            }
                          );
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full relative">
                <div className="w-full relative flex items-center">
                  <div className=" whitespace-nowrap overflow-hidden text-ellipsis text-xs">
                    {tokenGen}
                  </div>
                  <div
                    className="min-w-6 aspect-square relative bg-green-700 ml-2"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(tokenGen)
                        .then(() => {})
                        .catch((err) => {});
                    }}
                  ></div>
                </div>
                <div className="w-full relative mt-5">
                  <TextField
                    value={paymentToken}
                    className="w-full relative"
                    placeholder="wallet token"
                    onChange={(e) => {
                      setPaymentToken(e?.target?.value);
                    }}
                  />
                </div>
                <div className="w-full relative flex justify-end mt-3">
                  <div
                    className=" relative  w-fit px-4 py-2 bg-slate-950 text-white text-xs cursor-pointer rounded-sm"
                    onClick={() => {
                      createPaymentToken(
                        { email: userInfo.email, token: paymentToken },
                        (callb) => {
                          if (callb?.data && callb?.data?.item?.items) {
                            dispatch(
                              injectToken({
                                type: actionName.ALL_TOKEN_INJECT,
                                list: callb.data.item.items,
                              })
                            );
                            setTokenGen(null);
                          } else {
                          }
                        }
                      );
                    }}
                  >
                    Add-Token
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 relative flex flex-col pl-2">
          <h3 className={`${fonts.font_1.className}`}>Purchase History</h3>
          <div className="w-full relative h-[300px] overflow-y-auto">
            {selectToken.map((ele, index) => (
              <div className="w-full relative border-b mt-5 pb-2" key={index}>
                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>Header</div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {ele.header}
                  </div>
                </div>
                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>Token</div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {ele.token}
                  </div>
                </div>
                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>Price</div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {ele.amount}
                  </div>
                </div>

                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>
                    Discount
                  </div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {ele.discount}
                  </div>
                </div>

                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>
                    Quantity
                  </div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {ele.prodectCount}
                  </div>
                </div>

                <div className="flex">
                  <div className={`${fonts.font_7.className} mr-2`}>Date</div>
                  <div
                    className={`whitespace-nowrap overflow-hidden text-ellipsis ${fonts.font_7.className}`}
                  >
                    {new Date(ele.create_time).toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
