"use client";
import DisplayImage from "@/app/assets/bg/bg4.png";
import Tea1 from "@/app/assets/tea/alison-marras-vtntD9h1xBw-unsplash.jpg";
import Tea2 from "@/app/assets/tea/massimo-rinaldi-FmgZ5xzDG-s-unsplash.jpg";
import Tea3 from "@/app/assets/tea/nathan-dumlao-8yBQQqH3q8Q-unsplash.jpg";
import Tea4 from "@/app/assets/tea/sergey-n-0bSRG6z--6s-unsplash.jpg";
import Tea5 from "@/app/assets/tea/teacora-rooibos-FnTWsBohkdo-unsplash.jpg";
import Tea7 from "@/app/assets/tea/teacora-rooibos-RKDP3D-6G5E-unsplash.jpg";
import Tea6 from "@/app/assets/tea/tom-chen-NxkFLRNg8g0-unsplash.jpg";
import { fonts } from "@/app/components/fonts/font";
import Navheader from "@/app/components/nav-header/navHeader";
import ProdectBox from "@/app/components/prodectBox/prodectBox";
import Image from "next/image";
import "./style.css";
// Import Swiper React components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
import NavMenu from "@/app/components/navMenu/navMenu";
import SwiperCore from "swiper/core";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
SwiperCore.use([Autoplay, Pagination]);
function Slider() {
  const [displayCount, setDisplayCount] = useState(3);
  function setSide() {
    if (window.innerWidth > 768) {
      setDisplayCount(3);
    } else {
      setDisplayCount(1);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSide();
    });
    setSide();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={displayCount}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pag
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }} // Autoplay settings
        loop={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {[
          {
            image: Tea1,
          },
          {
            image: Tea2,
          },
          {
            image: Tea3,
          },
          {
            image: Tea4,
          },
          {
            image: Tea5,
          },
          {
            image: Tea6,
          },
          {
            image: Tea7,
          },
        ].map((element, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="aspect-square sm:aspect-video md:aspect-square w-full lg:w-[350px] xl:h-[400px] xl:w-[400px]  relative p-2">
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

export default function TeaPage() {
  const [activeNav,setActivenav]  = useState(false)
  const [toastActive, setToastActive] = useState(false);
  return (
    <div className="w-full relative">
      <NavMenu activeNav={activeNav} onClose={()=>{setActivenav(false)}} onLogin={() => {
          setToastActive(true);
        }}/>
        <LoginAndCreateToast
        activeToast={toastActive}
        onCloseToast={() => {
          setToastActive(false);
        }}
      />
      <div className="w-full relative aspect-[1/1.5] sm:h-[850px] md:h-[650px] xl:h-[900px] ">
        <div className="w-full h-full absolute flex flex-col">
          {/* <div className=" w-full h-28 z-10 relative "></div> */}
          <div className=" bg-opacity-50 w-full flex-grow z-10 relative flex justify-center items-center flex-col ">
            <div
              className={`w-full  text-white text-center text-4xl xl:text-7xl ${fonts.font_7.className} mb-2 sm:mb-20 md:mt-20 z-40`}
            >
              Our Populer Items
            </div>
            <div className="h-auto w-full   flex justify-center items-center">
              <div className="xl:px-0 px-2 max-w-[1200px] w-full h-[400px]  relative">
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

      <ProdectBox  />
    </div>
  );
}
