import Waiter3 from "@/app/assets/waiters/happy-young-delivery-woman-red-uniform-cap-holding-stack-food-packages-looking-front-smiling-cheerfully-standing-green-wall.jpg";
import Waiter2 from "@/app/assets/waiters/medium-shot-man-holding-coffee-cups.jpg";
import Waiter1 from "@/app/assets/waiters/pngaaa.com-1455434.png";
import Waiter4 from "@/app/assets/waiters/smiling-young-delivery-man-red-uniform-cap-standing-profile-view-holding-food-containers-paper-food-package-looking-front-isolated-olive-green-wall (1).jpg";
import Image from "next/image";
import { fonts } from "../fonts/font";
import Media1 from "@/app/assets/media/Path 130.svg";
import Media2 from "@/app/assets/media/Path 131.svg";
import Media3 from "@/app/assets/media/Path 132.svg";
import Media4 from "@/app/assets/media/x-social-media-round-icon.svg";
export default function Waiters() {
  return (
    <div className=" max-w-[1600px] w-full relative h-auto pb-20  m-auto">
      <div
        className={`text-2xl md:text-5xl text-center my-5 md:my-10 mt-5 md:mt-14 ${fonts.font_8.className} capitalize text-white`}
      >
        introducing with our {"waiter's"}
      </div>
      <div
        className={`text-center ${fonts.font_7.className} text-3xl md:text-7xl mt-5 md:mt-10 capitalize text-white`}
      >
        Our Responsivle {"waiter's"}
      </div>
      <div className="mt-10 w-full flex justify-center relative h-auto flex-wrap">
        {[
          {
            image: Waiter1,
          },
          {
            image: Waiter2,
          },
          {
            image: Waiter3,
          },
          {
            image: Waiter4,
          },
        ].map((element, index) => {
          return (
            <div  key={index} className="w-[350px] mx-1">
              <div
               
                className="h-[390px] w-full bg-white bg-opacity-10 relative   flex justify-end flex-col"
              >
                <Image
                  src={element.image}
                  alt=""
                  className="h-[250px] w-full relative "
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="h-[200px] w-full bg-black z-10 ">
                    <div className={`text-center text-white m-auto w-[80%] ${fonts.font_3.className} text-3xl`}>Waiter-Name</div>
                    <div className={`text-center text-white m-auto w-[80%]  ${fonts.font_11.className} `}>
                        Lorem ipsum dolor sit,  ducimus numquam quam velit distinctio ipsa explicabo, minus est?
                    </div>
                    <div className="w-[80%] md:w-[50%] h-[50px] mt-5 flex justify-around items-center m-auto flex-wrap">
                    <Media1 fill={"white"}/>
                    <Media2 fill={"white"}/>
                    <Media3 fill={"white"}/>
                    <Media4 fill={"white"}/>
                  </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
