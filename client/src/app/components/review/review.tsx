"use client";
import bg3 from "@/app/assets/bg/bg3.png";
import PersonImage from "@/app/assets/demo/pngwing.com.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { fonts } from "../fonts/font";
import "./style.css";
import { useEffect, useState } from "react";

export default function ReviewBox() {
  
  const [displayCount,setDisplayCount] = useState(3) 
  function setSide(){
    if (window.innerWidth>1024) {
      setDisplayCount(3)
    } else {
      setDisplayCount(1)
      
    }
  }
  useEffect(()=>{
      window.addEventListener("resize",()=>{
        setSide()
      })
      setSide()
  },[])
  return (
    <div className=" w-full h-auto mt-20  m-auto relative bg-slate-50 overflow-hidden">
      <Image src={bg3} alt="" className="absolute opacity-10 h-full w-full "  objectFit="cover" layout="fill"/>
      <div
        className={`mt-20 text-3xl xl:text-7xl ${fonts.font_7.className} text-center text-black`}
      >
        Client Review
      </div>
      <div className="m-auto relative h-[600px] max-w-[1600px] w-full left-0 top-0  mt-0 xl:mt-10 mb-10 flex items-center justify-center">
        <Swiper
          spaceBetween={100}
          slidesPerView={displayCount}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }} // Autoplay settings
          loop={true}
          className="w-full"
        >
          {[1, 2, 3, 4].map((element, index) => {
            return (
              <SwiperSlide key={index} className="my-10 xl:my-20  ">
               
                 <div className="w-full h-auto flex justify-center items-center">
                  <div className="w-[120px] relative">
                  <Image
                            src={PersonImage}
                            alt=""
                            className=" w-[120px] h-[120px]  -translate-y-[10%] transition-all scale-125 "
                          />
                  </div>
                </div>
                <div
                  className={`w-full h-auto  text-black ${fonts.font_3.className}`}
                >
                  <div className="text-center text-xl xl:text-3xl mt-3 xl:mt-8">
                  Header
                  </div>
                  <div
                    className={`text-center mt-3 xl:mt-8 text-xs xl:text-sm m-auto w-full  md:w-[700px] lg:w-full ${fonts.font_1.className}`}
                  >
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Perferendis, voluptatibus et maiores voluptas fugit ea
                      odit beatae suscipit veniam asperiores accusamus quae
                      laudantium ipsum illo corrupti quo cumque recusandae
                      voluptatum!
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          <div className="swiper-button-next h-10 w-10 text-yellow-300  "></div>
          <div className="swiper-button-prev h-10 w-10 text-yellow-300  "></div>
        </Swiper>
      </div>
    </div>
  );
}
