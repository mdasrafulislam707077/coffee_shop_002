"use client"
import CoffeeImage from "@/app/assets/coffeeImage/view-3d-coffee-cup.jpg";
import DisplayImage from "@/app/assets/demo/New folder/contemporary-coffee-shop-with-modern-elegance-design-generative-ai.jpg";
import CoIcon from "@/app/assets/icon/comment-svgrepo-com.svg";
import LikeIcon from "@/app/assets/icon/like-svgrepo-com.svg";
import ShIcon from "@/app/assets/icon/share-svgrepo-com.svg";
import { fonts } from "@/app/components/fonts/font";
import Footer from "@/app/components/footer/footer";
import Navheader from "@/app/components/nav-header/navHeader";
import NavMenu from "@/app/components/navMenu/navMenu";
import Image from "next/image";
import { useState } from "react";
import DataInjectHeader from "@/app/components/dataInject/dataInject";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
export default function Blog() {
  const [activeNav,setActiveNav] = useState(false) 
  const [toastActive, setToastActive] = useState(false);
  return (
    <div className="w-full">
       
      <NavMenu activeNav={activeNav} onClose={()=>setActiveNav(false)}   onLogin={() => {
          setToastActive(true);
        }}/>

<LoginAndCreateToast
        activeToast={toastActive}
        onCloseToast={() => {
          setToastActive(false);
        }}
      />

      <div className="w-full relative h-[400px] md:h-[550px] lg:h-[650px] xl:h-[750px] bg-slate-400">
        <div className="w-full h-full absolute flex flex-col">
          <div className=" w-full h-28 z-10 relative "></div>
          <div className="bg-black bg-opacity-50 w-full flex-grow z-10 relative flex justify-center items-center flex-col ">
            <div
              className={`${fonts.font_7.className} text-white text-4xl lg:text-7xl`}
            >
              Blog
            </div>
            <div
              className={`max-w-[650px] w-full lg:max-w-[900px]  text-center text-white ${fonts.font_11.className} text-xs  sm:text-sm md:text-lg lg:text-2xl mt-2 mb-4 px-1`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              consequuntur cum, eos sequi minus voluptatibus quis iusto corrupti
              molestias odit minima itaque fuga nesciunt, neque in ab delectus.
              Rerum, ex?
            </div>
          </div>
          <Image
            src={DisplayImage}
            alt=""
            className="w-full h-full relative "
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="z-50">
          <DataInjectHeader onMenuClick={()=>{
            setActiveNav(!activeNav)
          }}/>
        </div>
      </div>

      <div
        className={`mt-10 w-full relative  ${fonts.font_7.className}  text-center text-white text-4xl lg:text-7xl mt-20 `}
      >
        Blog-Post
      </div>
      <div className="max-w-[1600px] w-full relative m-auto  mt-10 px-3 sm:px-5 md:px-10 my-10">
        {[1, 2].map((element, index) => {
          return (
            <div
              key={index}
              className="w-full   mt-16 mb-2 flex flex-col lg:flex-row"
            >
              <div className="lg:w-[50%] h-[300px] md:h-[600px] lg:h-[500px] flex justify-center items-center">
                <div className=" w-full lg:w-[600px] h-full bg-slate-900 relative overflow-hidden">
                  <Image
                    src={CoffeeImage}
                    alt=""
                    className="w-full"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="w-[98%] lg:w-[50%] h-auto flex justify-center items-center mt-5">
                <div className="w-[100%] h-full p-0  md:p-10 pt-0">
                  <div
                    className={`text-2xl md:text-3xl ${fonts.font_3.className} text-white`}
                  >
                    New Prodects
                  </div>
                  <div
                    className={`text-xs ${fonts.font_7.className} text-white  sm:ml-1 mt-1`}
                  >
                    {" 12.06.2024,12:05:20 (pm)"}
                  </div>
                  <div
                    className={`lg:max-w-[700px] w-full text-white mt-2 sm:mt-3 h-auto mb-4 md:mb-8 text-xs md:text-sm xl:text-base  ${fonts.font_11.className}`}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Asperiores fugit culpa dolorum dolor quaerat beatae!
                    Consequuntur debitis magni sint. Ab excepturi ipsa cumque
                    libero magni omnis modi impedit soluta molestias. Non sit
                    animi corrupti quibusdam cupiditate perspiciatis maxime
                    ipsa, rem repellat mollitia illum eius numquam? elit.
                    Asperiores fugit culpa doa, rem repellat mollitia illum eius
                    numquam? elit. Asperiores fugit culpa doa, rem repellat
                    mollitia illum eius numquam? elit. Asperiores fugit culpa
                    doa, rem repellat mollitia illum eius numquam? elit.
                    Asperiores fugit culpa dolorum dolor quaerat beatae!
                    Consequuntur debitis magni sint. Ab excepturi ipsa cumque
                    libero magni omnis modi impedit soluta molestias. Non sit
                    animi corrupti quibusdam cupiditate perspiciatis maxime
                    ipsa, rem repellat mollitia illum Ipsa quae eum sint libero
                    dignissimos. Quia laudantium eum sapiente commodi ipsum,
                    cumque eveniet omnis.
                  </div>
                  <div className="w-full  mt-1 flex">
                    <div className="flex">
                      <div className="w-8  mx-2 translate-y-1  scale-90">
                        <div className="-translate-y-1 cursor-pointer">
                          <LikeIcon fill="white" />
                        </div>
                        <div className=" text-white text-xs text-center">
                          11K
                        </div>
                      </div>

                      <div className="w-8  mx-2 rotate-180 ml-5   scale-90">
                        <div className="rotate-180 text-white text-xs text-center ">
                          11K
                        </div>
                        <div className="cursor-pointer">
                          <LikeIcon fill="white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow h-full  flex justify-center items-center mx-2">
                      <div className="w-9 flex justify-center items-center flex-col scale-90 cursor-pointer">
                        <CoIcon fill="white" />
                        <div className=" text-white text-xs text-center ">
                          Comment
                        </div>
                      </div>
                    </div>
                    <div className=" h-full w-20  flex justify-center items-center mx-2">
                      <div className="w-9 flex justify-center items-center flex-col scale-90  cursor-pointer">
                        <ShIcon fill="white" />
                        <div className=" text-white text-xs text-center capitalize">
                          share
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
