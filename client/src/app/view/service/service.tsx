"use client"
import DisplayImage from "@/app/assets/demo/New folder/vintage-teacups-second-hand-market.jpg";
import Feature from "@/app/components/features001/feature";
import FinalWords from "@/app/components/finalWordsOfAbout/about";
import { fonts } from "@/app/components/fonts/font";
import Footer from "@/app/components/footer/footer";
import Navheader from "@/app/components/nav-header/navHeader";
import NavMenu from "@/app/components/navMenu/navMenu";
import Image from "next/image";
import { useState } from "react";
import DataInjectHeader from "@/app/components/dataInject/dataInject";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";

export default function Service() {
  
  const [activeNav,setActiveNav] = useState(false) 
  const [toastActive, setToastActive] = useState(false);
  return (
    <div className="w-full ">
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
              Service
            </div>
            <div
              className={`max-w-[650px] w-full lg:max-w-[900px]  text-center text-white ${fonts.font_11.className}  text-sm md:text-lg lg:text-2xl mt-2 mb-4`}
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

      <Feature />
      <FinalWords />
      <Footer />
    </div>
  );
}
