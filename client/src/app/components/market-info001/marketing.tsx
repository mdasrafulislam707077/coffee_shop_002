import Bg from "@/app/assets/bg/coffee_0001.png";
import ImageItem2 from "@/app/assets/marketing/award_1.png";
import ImageItem3 from "@/app/assets/marketing/coffe.png";
import ImageItem from "@/app/assets/marketing/happy.png";
import Image from "next/image";
import { fonts } from "../fonts/font";
export default function Marketing001() {
  return (
    <div className="h-auto 2xl:h-[750px] bg-white w-full relative overflow-hidden mt-5 pb-14 flex justify-center items-center">
      <div className="w-full opacity-5 absolute h-full">
        <Image
          src={Bg}
          alt="aa"
          className="w-full"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full  relative z-20  flex justify-around items-center flex-wrap 2xl:flex-nowrap ">
        <div className="w-[450px]  xl:w-[350px] mx-1 xl:mx-20  relative mt-5 md:mb-10">
          <div className="w-full relative h-[200px] flex justify-center items-center  translate-x-4">
            <div className=" min-w-[200px] md:min-w-[300px] aspect-square relative">
              <Image src={ImageItem} alt="aaaaaa" layout="fill" objectFit="contain" />
            </div>
          </div>
          <div
            className={`text-center text-2xl md:text-3xl md:mt-8 md:mb-8 ${fonts.font_3.className} `}
          >
            Exceptional Customer Service
          </div>
          <div className={`text-center text-xs md:text-sm mt-6 ${fonts.font_1.className}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            similique excepturi corrupti quo porro moium esse earum laborum
            facilis, mollitia officiis ex commodi similique non repudiandae
            cumque omnis!
          </div>
        </div>

        <div className="w-[450px] xl:w-[350px]   mx-1 xl:mx-20  relative mt-5 md:mb-10 ">
          <div className="w-full relative h-[200px] flex justify-center items-center   p-10 pt-14">
            <div className=" min-w-[180px] md:min-w-[250px]  aspect-square relative">
              <Image
                src={ImageItem3}
                alt="a"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div
            className={`text-center text-2xl md:text-3xl   md:mt-8 md:mb-8 ${fonts.font_3.className} `}
          >
            Exceptional Customer Service
          </div>
          <div className={`text-center text-xs md:text-sm mt-6 ${fonts.font_1.className}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            similique excepturi corrupti quo porro moium esse earum laborum
            facilis, mollitia officiis ex commodi similique non repudiandae
            cumque omnis!
          </div>
        </div>

        <div className="w-[450px] xl:w-[350px]  mx-1 xl:mx-20 relative mt-5  md:mb-10 ">
          <div className="w-full relative h-[200px] aspect-square flex justify-center items-center   ">
            <div className=" min-w-[180px] md:min-w-[250px]  aspect-square relative">
              <Image
                src={ImageItem2}
                alt="aa11a"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div
            className={`text-center text-2xl md:text-3xl md:mt-8 md:mb-8 ${fonts.font_3.className} `}
          >
            Exceptional Customer Service
          </div>
          <div className={`text-center text-xs md:text-sm mt-6 ${fonts.font_1.className}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            similique excepturi corrupti quo porro moium esse earum laborum
            facilis, mollitia officiis ex commodi similique non repudiandae
            cumque omnis!
          </div>
        </div>
      </div>
      
    </div>
  );
}
