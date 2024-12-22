"use client";
import DisplayImage from "@/app/assets/demo/New folder/full-shot-people-sitting-together-table.jpg";
import AddressIcon from "@/app/assets/icon/address-svgrepo-com.svg";
import EmailIcon from "@/app/assets/icon/email-open-svgrepo-com.svg";
import PhoneIcon from "@/app/assets/icon/phone-call-svgrepo-com.svg";
import { fonts } from "@/app/components/fonts/font";
import Footer from "@/app/components/footer/footer";
import Navheader from "@/app/components/nav-header/navHeader";
import NavMenu from "@/app/components/navMenu/navMenu";
import Image from "next/image";
import { useState } from "react";
import DataInjectHeader from "@/app/components/dataInject/dataInject";
import LoginAndCreateToast from "@/app/components/login_and_create/toast";
export default function Contact() {
  const [activeNav, setActiveNav] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  return (
    <div className="w-full">
      <div className="z-[999999999999999] relative">
        <NavMenu activeNav={activeNav} onClose={() => setActiveNav(false)} onLogin={() => {
          setToastActive(true);
        }}/>
      </div>
      <LoginAndCreateToast
        activeToast={toastActive}
        onCloseToast={() => {
          setToastActive(false);
        }}
      />
      <div className="w-full relative h-[400px] md:h-[550px] lg:h-[650px] xl:h-[750px] bg-slate-400">
        <div className="w-full h-full absolute flex flex-col">
          <div className=" w-full h-28 z-10 relative "></div>
          <div className="bg-black bg-opacity-50 w-full flex-grow z-10 relative flex justify-center items-center flex-col">
            <div
              className={`${fonts.font_7.className} text-white text-4xl lg:text-7xl`}
            >
              Contact Us
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
          <DataInjectHeader
            onMenuClick={() => {
              setActiveNav(!activeNav);
            }}
          />
        </div>
      </div>
      <div className="max-w-[1600px] w-full p-1   m-auto relative mt-28">
        <div
          className={`relative capitalize text-3xl md:text-4xl lg:text-7xl  ${fonts.font_7.className} text-center text-white`}
        >
          address & location
        </div>
        <div className="w-full aspect-video bg-slate-100 mt-16 relative">
          <iframe
            className="w-full h-full relative"
            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d1124.3176752270297!2d90.50758326962865!3d23.6428615772081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d23.6428202!2d90.5082097!4m3!3m2!1d23.6428182!2d90.5082058!5e1!3m2!1sen!2sbd!4v1723789660642!5m2!1sen!2sbd"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="w-full  mt-10 md:mt-20 flex justify-center flex-col xl:flex-row ">
          <div className=" w-[98%] xl:w-[50%]">
            <div
              className={`text-2xl md:text-5xl capitalize pl-16 md:pl-20 text-white  ${fonts.font_7.className}`}
            >
              Information
            </div>
            <div className="w-full   mb-5 md:mb-20 md:mt-10 p-10 px-5 text-white flex flex-wrap lg:flex-nowrap xl:flex-wrap ">
              <div className="w-full md:w-fit h-[200px]   md:my-4 flex px-2 scale-[0.9]">
                <div className="h-[150px] w-[150px] flex justify-center items-center">
                  <div className="h-[150px] w-[150px]  ">
                    <AddressIcon />
                  </div>
                </div>
                <div className="w-full relative py-5 mx-auto md:ml-2 ">
                  <div
                    className={`w-full font-extrabold text-xl xl:text-2xl  ${fonts.font_7.className}`}
                  >
                    Address
                  </div>
                  <div
                    className={` text-sm xl:text-base w-[200px] ${fonts.font_11.className}`}
                  >
                    Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square,
                    Dhaka 1000
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit  h-[200px]  md:my-4 flex px-2 scale-[0.9]">
                <div className="h-[150px] w-[150px] flex justify-center items-center">
                  <div className="h-[150px] w-[150px]  p-10">
                    <PhoneIcon />
                  </div>
                </div>
                <div className="w-full relative py-5 ml-2">
                  <div
                    className={`w-full font-extrabold text-xl xl:text-2xl whitespace-nowrap ${fonts.font_7.className}`}
                  >
                    Phone & Hot-Line
                  </div>
                  <div
                    className={`w-[40%] text-sm xl:text-base ${fonts.font_11.className}`}
                  >
                    <div className={` ${fonts.font_11.className} my-2`}>
                      +8801827334764
                    </div>
                    <div className={` ${fonts.font_11.className} my-2`}>
                      +8801827334762
                    </div>
                    <div className={` ${fonts.font_11.className} my-2`}>
                      +8801827334763
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit  h-[200px]  md:my-4 flex px-2 scale-[0.9]">
                <div className="h-[150px] w-[150px] flex justify-center items-center">
                  <div className="h-[150px] w-[150px]  p-5">
                    <EmailIcon />
                  </div>
                </div>
                <div className="w-full relative py-5 ml-2">
                  <div
                    className={`w-full font-extrabold text-sm xl:text-base  ${fonts.font_7.className}`}
                  >
                    Email & Social Media
                  </div>
                  <div className={`w-[40%] ${fonts.font_11.className}`}>
                    <div
                      className={` ${fonts.font_11.className} text-sm xl:text-base my-2`}
                    >
                      info@gmail.com
                    </div>
                    <div
                      className={` ${fonts.font_11.className} text-sm xl:text-base my-2`}
                    >
                      info@hotmail.com
                    </div>
                    <div
                      className={`${fonts.font_11.className} text-sm xl:text-base my-2`}
                    >
                      facebook.com/coffees
                    </div>
                    <div
                      className={` ${fonts.font_11.className} text-sm xl:text-base my-2`}
                    >
                      instagram.com/coffees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[50%]">
            <div
              className={`text-2xl md:text-5xl capitalize md:pl-8 text-white ${fonts.font_7.className}`}
            >
              Your Objection
            </div>
            <div className="w-full   mb-20 mt-4 md:mt-10 p-1 md:p-10">
              <div className={`w-full my-4 flex ${fonts.font_7.className} `}>
                <div className="w-[50%] h-[40px]  mr-1 bg-white">
                  <input
                    className={`bg-transparent border-none outline-none h-full w-full px-1  ${fonts.font_4.className}`}
                    placeholder="name"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="w-[50%] h-[40px]  ml-1 bg-white">
                  <input
                    className={`bg-transparent border-none outline-none h-full w-full px-1  ${fonts.font_4.className}`}
                    placeholder="email"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="w-full my-4 h-[40px] bg-white ">
                <input
                  className={`bg-transparent border-none outline-none h-full w-full px-1  ${fonts.font_4.className}`}
                  placeholder="subject"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-full my-4 h-[400px] md:h-[500px] bg-white ">
                <textarea
                  name=""
                  id=""
                  className={`h-full w-full p-2 border-none outline-none  resize-none ${fonts.font_4.className}`}
                  placeholder="text"
                ></textarea>
              </div>
              <div className="w-full flex justify-end">
                <div
                  role="button"
                  className={`px-8 py-2 w-full text-center bg-white text-black rounded-sm cursor-pointer text-xl transition-all ${fonts.font_4.className}`}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
