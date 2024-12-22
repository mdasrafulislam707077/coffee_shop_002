import Bg6 from "@/app/assets/bg/bg6.png";
import Bg7 from "@/app/assets/bg/bg7.png";
import Bg from "@/app/assets/coffeeImage/view-3d-coffee-cup.jpg";
import Image from "next/image";
import { fonts } from "../fonts/font";
export default function NewItem001() {
  return (
    <div className="w-full  p-4">
      <div
        className={`mt-20  ${fonts.font_7.className} text-white text-center text-3xl xl:text-7xl `}
      >
        Try Our New Coffee Creations Today!
      </div>
      {[1,2,1].map((element,index)=>{
        return <div key={index} className="mt-20 lg:h-[800px] max-w-[1600px] w-full  m-auto flex flex-col lg:flex-row relative mx-0 min-[1600px]:mx-auto">
        <div className={` w-full lg:w-1/2 relative h-full  p-5 xl:p-20 flex items-center justify-center ${index%2!=0?'-order-1':"-order-2 lg:order-1"}`}>
          <div className="aspect-video lg:aspect-square w-full lg:w-[500px] z-10 relative group overflow-hidden">
            <div className="h-full w-full absolute bg-black bg-opacity-50 transition-all group-hover:bg-opacity-60  group-hover:scale-110 z-10 flex justify-center items-center" >
            <div className={`h-10 w-32 flex justify-center items-center text-white transition-all  group-hover:scale-90 cursor-pointer border-white border-2 ${fonts.font_7.className}`} >
              Checkout
            </div>
            </div>
            <Image src={Bg} alt="" layout="fill" objectFit="cover"  className="group-hover:scale-110 transition-all"/>
          </div>
        </div>
        <div className={`w-full lg:w-1/2 relative h-full  flex justify-center items-center ${index%2==0?'-order-1':"order-1"} `}>
          <div className="relative  top-0 left-0  h-auto pb-14 lg:pb-4 w-[100%] bg-white">
            <Image
              src={index%2==0? Bg6:Bg7}
              alt=""
              layout="fill"
              objectFit="cover"
              className={`absolute ${index%2!=0? 'opacity-20':'opacity-10'} ${index/2!=0?'-order-1':"order-1"}`}
            />
            <div className={`relative h-auto w-full p-6 xl:p-10 `}>
              <div className={`text-5xl ${fonts.font_3.className}`}>Lungo</div>
              <div className={` text-[10px] sm:text-xs xl:text-sm mt-5 xl:mt-10 ${fonts.font_1.className}`}>
                A Lungo, which means {"long"} in Italian, is a coffee drink made
                by brewing an espresso with more water, resulting in a larger,
                milder cup. The longer extraction time, typically 45-60 seconds,
                gives it a unique flavor profile that is less intense than a
                traditional espresso but richer than an Americano. This
                versatile drink can be customized with a touch of sugar, a
                splash of milk or cream, or even a hint of vanilla syrup. For an
                extra flair, a sprinkle of cinnamon on top makes for a
                delightful garnish. Perfect for those who enjoy a longer, more
                leisurely coffee experience.
              </div>
              <div className="w-full relative mt-1">
                <div
                  className={`text-base xl:text-xl font-extrabold ${fonts.font_7.className}`}
                >
                  Ingredients:
                </div>
                <ul className="w-full ml-2 xl:ml-5 list-disc">
                  {[1,1,1,1,1,1,1,1].map((element,index)=>{
                      return <li
                      key={index}
                      className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                    >
                      <span className=" text-sm xl:text-base   ">Milk or cream</span>{" "}
                      <span className="flex-grow  text-sm xl:text-base    border-t border-dotted border-black"></span>{" "}
                      <span className=" text-sm xl:text-base   "> As desired</span>
                      <span className="text-gray-600 text-sm xl:text-base   "> {"(optional)"}</span>
                    </li>
                  })}
                  {/* <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Coffee beans</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span>7-9 grams</span>
                  </li>
                  <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Water</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span>60-90 ml</span>
                  </li>
                  <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Sugar</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span> To taste</span>{" "}
                    <span className="text-gray-600"> {"(optional)"}</span>
                  </li>
                  <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Milk or cream</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span> As desired</span>
                    <span className="text-gray-600"> {"(optional)"}</span>
                  </li>
                  <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Vanilla syrup</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span>To taste</span>{" "}
                    <span className="text-gray-600"> {"(optional)"}</span>
                  </li>
                  <li
                    className={`mt-2 font-extrabold ${fonts.font_7.className} flex items-center justify-between`}
                  >
                    <span>Cinnamon</span>{" "}
                    <span className="flex-grow  border-t border-dotted border-black"></span>{" "}
                    <span> For garnish</span>{" "}
                    <span className="text-gray-600"> {"(optional)"}</span>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      })}
    </div>
  );
}
