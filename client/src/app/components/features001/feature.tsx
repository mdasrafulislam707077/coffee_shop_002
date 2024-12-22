"use client";
import bg from "@/app/assets/bg/bg4.png";
import Service1Icon from "@/app/assets/offer/Group 26.svg";
import Service2Icon from "@/app/assets/offer/Group 5.svg";
import Service3Icon from "@/app/assets/offer/Path 1.svg";
import Service4Icon from "@/app/assets/offer/Path 10.svg";
import Service5Icon from "@/app/assets/offer/Path 8.svg";
import Service6Icon from "@/app/assets/offer/customer-service-72.svg";
import Service7Icon from "@/app/assets/offer/fog_6853951.svg";
import Service8Icon from "@/app/assets/offer/food-delivery-icon.svg";
import Service9Icon from "@/app/assets/offer/menu-svgrepo-com (1).svg";
import Service10Icon from "@/app/assets/offer/working-hours-icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { fonts } from "../fonts/font";
import "./style.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Feature = () => {
  const [displayCount, setDisplayCount] = useState(3);

  function setSide() {
    if (window.innerWidth > 1024) {
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
    <div className="w-full mx-auto h-auto px-1 relative py-5 overflow-hidden">
      <div className="absolute w-screen left-0 h-full bg-white">
        <Image
          src={bg}
          alt=""
          className="w-full h-full opacity-20"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={`capitalize text-3xl xl:text-7xl text-center text-black z-50 ${fonts.font_7.className} mt-10 relative`}
      >
        Facility
      </div>
      <div className="swiper-container h-auto mt-10 xl:mt-24 max-w-[1600px] w-full mx-auto overflow-hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={displayCount}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {[
            {
              Icon: Service1Icon,
              header: "Premium Quality Products",
              des: `Offering high-quality coffee, tea, and other beverages sets your shop apart by ensuring a superior taste and experience. Using premium beans, organic ingredients, and skilled baristas to craft each drink demonstrates a commitment to excellence. This approach appeals to coffee enthusiasts and connoisseurs who value quality and are willing to pay a premium for a better product.`,
            },
            {
              Icon: Service2Icon,
              header: "Loyalty Programs",
              des: `Implementing a loyalty program that rewards frequent customers with discounts, free items, or special offers encourages repeat business. This strategy incentivizes regular visitors to return more frequently to enjoy the benefits of the loyalty program, fostering a sense of appreciation and building a loyal customer base.`,
            },
            {
              Icon: Service3Icon,
              header: "Free Wi-Fi and Charging Stations",
              des: `Offering free Wi-Fi and ample charging stations makes your coffee shop an attractive spot for remote workers, students, and professionals who need to stay connected. This convenience supports their need for a reliable place to work or study, thereby increasing the likelihood of them choosing your coffee shop as their go-to location for productivity`,
            },
            {
              Icon: Service4Icon,
              header: "Eco-Friendly Practices",
              des: `Using sustainable practices, such as biodegradable cups, recycling programs, and ethically sourced products, appeals to environmentally conscious customers. By prioritizing sustainability in your operations, you attract eco-conscious consumers who prioritize sustainability in their purchasing decisions, thereby aligning your business with broader environmental values.`,
            },
            {
              Icon: Service5Icon,
              header: "Community Engagement",
              des: `Hosting community events, local artist showcases, or book clubs can foster a sense of community and make your coffee shop a local hub. Engaging with the local community through these events helps to create a space where local residents feel welcome and connected, enhancing the social fabric of your neighborhood.`,
            },
            {
              Icon: Service6Icon,
              header: "Exceptional Customer Service",
              des: `Providing friendly, efficient, and personalized service can significantly enhance the customer experience. Training staff to be knowledgeable and courteous ensures that customers feel valued and respected during each visit. This level of service attracts regular customers who appreciate consistency and are likely to become loyal patrons, reinforcing a positive reputation for your coffee shop.`,
            },
            {
              Icon: Service7Icon,
              header: "Inviting Atmosphere",
              des: `Creating a cozy, stylish, and welcoming environment transforms your coffee shop into a desirable place for customers to relax, work, or socialize. Thoughtful decor, comfortable seating, and ambient music contribute to an inviting atmosphere. This makes your establishment a preferred destination for students, remote workers, and groups of friends looking for a comfortable and pleasant place to spend their time.`,
            },
            {
              Icon: Service8Icon,
              header: "Online Ordering and Delivery Services",
              des: `Being located in a high-traffic area with extended hours of operation makes your coffee shop more accessible to a larger number of people. This strategic positioning appeals to commuters, early risers, and late-night workers who need a convenient place to get their coffee fix, ensuring that your shop is a viable option throughout the day.`,
            },
            {
              Icon: Service9Icon,
              header: "Unique Menu Offerings",
              des: `Introducing unique and seasonal menu items, such as specialty coffees, unique blends, and exclusive snacks, keeps your menu interesting and encourages customers to try new things. This approach caters to foodies and adventurous eaters who enjoy exploring novel and unique offerings, thereby adding an element of excitement to their dining experience.`,
            },
            {
              Icon: Service10Icon,
              header: "Convenient Location and Hours ",
              des: `Providing online ordering and delivery options makes it easy for customers to enjoy your products from the comfort of their home or office. This convenience caters to busy professionals, families, and individuals who prefer the ease of ordering online and having their coffee delivered, thus expanding your reach beyond the physical location of your coffee shop.`,
            },
          ].map((element, index) => {
            return (
              <SwiperSlide key={index} className="my-10 xl:my-20">
                <div className="w-full h-[100px] flex justify-center items-center">
                  <div className="w-[120px] relative">
                    <element.Icon />
                  </div>
                </div>
                <div
                  className={`w-full h-auto text-black ${fonts.font_3.className}`}
                >
                  <div className="text-center text-xl xl:text-3xl mt-3 xl:mt-8">
                    {element?.header}
                  </div>
                  <div
                    className={`text-center mt-3 xl:mt-8 text-xs xl:text-sm m-auto w-full md:w-[700px] lg:w-full ${fonts.font_1.className}`}
                  >
                    {element.des}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Feature;
