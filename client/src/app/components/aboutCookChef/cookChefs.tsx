import CardBg from "@/app/assets/bg/5193128.jpg";
import CH1 from "@/app/assets/demo/chefs/pngwing.com (1).png";
import CH3 from "@/app/assets/demo/chefs/pngwing.com (3).png";
import CH4 from "@/app/assets/demo/chefs/pngwing.com (4).png";
import CH from "@/app/assets/demo/chefs/pngwing.com.png";
import Media1 from "@/app/assets/media/Path 130.svg";
import Media2 from "@/app/assets/media/Path 131.svg";
import Media3 from "@/app/assets/media/Path 132.svg";
import Media4 from "@/app/assets/media/x-social-media-round-icon.svg";
import Sig from "@/app/assets/sig/noun-signature-1745296.svg";
import Image from "next/image";
import { fonts } from "../fonts/font";
export default function CookChefs() {
  return (
    <div className="max-w-[1600px]  w-full  m-auto">
      <div
        className={`text-2xl md:text-5xl text-center my-5 md:my-10 mt-14 ${fonts.font_8.className} capitalize text-white`}
      >
        introducing with our {"chef's"}
      </div>
      <div
        className={`text-center ${fonts.font_7.className} text-3xl md:text-7xl mt-2 md:mt-10 capitalize text-white `}
      >
        Our Special {"Chef's"}
      </div>
      {[
        {
          image: CH1,
        },
        {
          image: CH3,
        },
        {
          image: CH4,
        },
        {
          image: CH,
        },
      ].map((element, index) => {
        return (
          <div
            key={index}
            className=" w-full flex overflow-hidden mb-2 md:mb-10 flex-col lg:flex-row p-2 md:p-10 lg:p-5"
          >
            <div
              className={`lg:w-[50%] h-[400px] md:h-[600px] flex justify-center items-center ${
                index % 2 != 0 ? "-order-3 lg:-order-1" : "-order-3 lg:order-1"
              }`}
            >
              <div className="h-[400px] md:w-[400px] w-[340px]  -translate-y-[25%] ">
                <div className="h-[600px] md:h-[600px] md:w-[400px] w-[340px] flex items-end overflow-hidden rounded-b-full ">
                  <div className="h-[340px] md:h-[400px] md:w-[400px] w-[340px]  bg-white bg-opacity-10 rounded-full  border-2 group translate-y-[1%]">
                    <Image
                      src={element.image}
                      alt=""
                      objectFit="cover"
                      className="w-full -translate-y-[10%] group-hover:-translate-y-[13%] transition-all scale-100 "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`lg:w-[50%] h-[600px] flex justify-center items-center ${
                index % 2 == 0 ? "-order-1" : "1"
              }`}
            >
              <div className="w-full h-auto py-5 md:py-10 pt-10 md:pt-20 bg-slate-100 translate-y-[10%] relative">
                <Image src={CardBg} alt="" className="absolute opacity-5" />
                <div className="relative h-full w-full flex flex-col justify-center items-center pb-10">
                  <div
                    className={`text-center ${fonts.font_3.className} text-xl md:text-3xl font-extrabold`}
                  >
                    Liam Noah Oliver
                  </div>
                  <div
                    className={`w-[90%] text-center ${fonts.font_7.className} text-base mt-10 md:text-xl`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias cum alias excepturi enim repudiandae sit
                    exercitationem omnis, molestiae consequatur voluptate,
                    facilis reprehenderit deserunt maiores magnam corporis?
                    Mollitia nobis libero suscipit. Modi iusto molestias
                    quibusdam voluptate, dicta corrupti architecto iure beatae
                    consectetur libero enim nemo fuga maiores dignissimos vero
                    temporibus unde sed, pariatur autem deserunt quae. Cumque
                    ipsa necessitatibus reiciendis rem.
                  </div>
                  <div className="w-full h-5 flex justify-end px-20">
                    <div className="w-20">
                      <Sig />
                    </div>
                  </div>
                  <div className="w-[80%] md:w-[60%] lg:w-[40%] h-[50px] mt-10 flex justify-around items-center">
                    <Media1 />
                    <Media2 />
                    <Media3 />
                    <Media4 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
