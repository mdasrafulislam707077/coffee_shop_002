"use client";
import DisplayImage from "@/app/assets/bg/bg4.png";
import Coffee1 from "@/app/assets/coffee/andres-vera-BewKTZMv7V0-unsplash.jpg";
import Coffee2 from "@/app/assets/coffee/andres-vera-Tcejca3Buq4-unsplash.jpg";
import Coffee3 from "@/app/assets/coffee/christina-rumpf-LMzwJDu6hTE-unsplash.jpg";
import Coffee4 from "@/app/assets/coffee/connor-home-MH8Iu7OC_UE-unsplash.jpg";
import Coffee5 from "@/app/assets/coffee/james-william-qMpsMY3q-Qg-unsplash.jpg";
import Coffee7 from "@/app/assets/coffee/jarek-ceborski-IhqDpFz7I8Q-unsplash.jpg";
import Coffee6 from "@/app/assets/coffee/jeremy-yap-jn-HaGWe4yw-unsplash.jpg";
import { fonts } from "@/app/components/fonts/font";
import Navheader from "@/app/components/nav-header/navHeader";
import Image from "next/image";
import "./style.css";
import ProductBox from "@/app/components/prodectBox/prodectBox";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import NavMenu from "@/app/components/navMenu/navMenu";

// Import Swiper styles
import SwiperCore from "swiper/core";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useState } from "react";
SwiperCore.use([Autoplay, Pagination]);
function Slider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }} // Autoplay settings
        loop={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 10,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {[
          {
            image: Coffee1,
          },
          {
            image: Coffee2,
          },
          {
            image: Coffee3,
          },
          {
            image: Coffee4,
          },
          {
            image: Coffee5,
          },
          {
            image: Coffee6,
          },
          {
            image: Coffee7,
          },
        ].map((element, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="h-[400px] w-[400px]  relative">
                <Image
                  src={element.image}
                  alt=""
                  className=" w-full"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default function Coffee() {
  const [activeNav,setActivenav]  = useState(false)
  const [toastActive, setToastActive] = useState(false);
  return (
    <div className="w-full">
      <NavMenu activeNav={activeNav} onClose={()=>{setActivenav(false)}} onLogin={() => {
          setToastActive(true);
        }}/>
        <LoginAndCreateToast
        activeToast={toastActive}
        onCloseToast={() => {
          setToastActive(false);
        }}
      />
      <div className="w-full relative h-[900px] ">
        <div className="w-full h-full absolute flex flex-col">
          {/* <div className=" w-full h-28 z-10 relative "></div> */}
          <div className=" bg-opacity-50 w-full flex-grow z-10 relative flex justify-center items-center flex-col ">
            <div
              className={`w-full  text-white text-center text-7xl ${fonts.font_7.className} mb-20 z-40`}
            >
              Our Populer Items
            </div>
            <div className="h-auto w-full    flex justify-center items-center">
              <div className="w-[1200px] h-[400px]  relative">
                <Slider />
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
        </div>
        <div className="z-20">
          <Navheader  onMenuClick={()=>{
            setActivenav(!activeNav)
          }}/>
        </div>
      </div>
      <ProductBox isCoffee/>
    </div>
  );
}
