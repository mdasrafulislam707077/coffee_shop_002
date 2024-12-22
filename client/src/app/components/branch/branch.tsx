import Demo1 from "@/app/assets/demo/jazmin-quaynor-9Y8vxVQN4o4-unsplash.jpg";
import Demo2 from "@/app/assets/demo/lily-banse--6OpD6mmI8M-unsplash.jpg";
import Demo3 from "@/app/assets/demo/simona-todorova-GFcKyOrSO4M-unsplash.jpg";
import Demo4 from "@/app/assets/demo/the-anchor-ACtEE_FcaRU-unsplash.jpg";
import Demo5 from "@/app/assets/demo/toa-heftiba-yfaEuuackFw-unsplash.jpg";
import Image from "next/image";
import { fonts } from "../fonts/font";
export default function Branch() {
  return (
    <div className=" w-full  bg-black m-auto ">
      <div
        className={`text-3xl xl:text-7xl capitalize  mt-12 text-center text-white ${fonts.font_7.className}`}
      >
        our populer branch
      </div>
      <div className="w-full flex h-auto xl:h-[700px] mt-20 flex-col xl:flex-row">
        <div className="item w-full xl:w-[50%] aspect-video h-auto xl:h-[700px]  relative p-5">
          <div className="h-full w-full bg-slate-700 relative group overflow-hidden">
            <div className="h-full w-full absolute bg-black bg-opacity-60 z-20 cursor-pointer flex items-center justify-center">
              <div
                className={`border-2 border-white w-36 md:w-48 h-10 md:h-14 rounded-sm flex justify-center items-center text-2xl md:text-3xl text-white ${fonts.font_8.className} transition-all hover:scale-110 bg-white bg-opacity-10`}
              >
                read more
              </div>
            </div>
            <Image
              src={Demo1}
              alt=""
              objectFit="cover"
              layout="fill"
              className="group-hover:scale-110 transition-all"
            />
          </div>
        </div>
        <div className=" w-full xl:w-[50%] h-1/2 xl:h-full relative p-5 flex  items-end justify-around flex-col ">
          <div className="w-full h-auto md:h-1/2  flex flex-col md:flex-row pb-1">
            <div className="w-full bg-slate-500 mb-2 md:mb-0 relative h-[250px] md:ml-2 group overflow-hidden">
              <div className="h-full w-full absolute bg-black bg-opacity-60 z-20 cursor-pointer flex items-center justify-center">
                <div
                  className={`border-2 border-white w-28 md:w-48 h-10 md:h-14 rounded-sm flex justify-center items-center text-xl md:text-2xl text-white ${fonts.font_8.className} transition-all hover:scale-110`}
                >
                  read more
                </div>
              </div>

              <Image
                src={Demo2}
                alt=""
                objectFit="cover"
                layout="fill"
                className="group-hover:scale-110 transition-all"
              />
            </div>
            <div className="w-full bg-slate-500 relative h-[250px] md:ml-2 group overflow-hidden mb-2 md:mb-0">
              <div className="h-full w-full absolute bg-black bg-opacity-60 z-20 cursor-pointer flex items-center justify-center">
                <div
                  className={`border-2 border-white w-28 md:w-48 h-10 md:h-14 rounded-sm flex justify-center items-center text-xl md:text-2xl text-white ${fonts.font_8.className} transition-all hover:scale-110`}
                >
                  read more
                </div>
              </div>

              <Image
                src={Demo3}
                alt=""
                objectFit="cover"
                layout="fill"
                className="group-hover:scale-110 transition-all"
              />
            </div>
          </div>

          <div className="w-full h-auto md:h-1/2  flex flex-col md:flex-row pb-1">
            <div className="w-full bg-slate-500 mb-2 md:mb-0 relative h-[250px] md:ml-2 group overflow-hidden">
              <div className="h-full w-full absolute bg-black bg-opacity-60 z-20 cursor-pointer flex items-center justify-center">
                <div
                  className={`border-2 border-white w-28 md:w-48 h-10 md:h-14 rounded-sm flex justify-center items-center text-xl md:text-2xl text-white ${fonts.font_8.className} transition-all hover:scale-110`}
                >
                  read more
                </div>
              </div>
              <Image
                src={Demo4}
                alt=""
                objectFit="cover"
                layout="fill"
                className="group-hover:scale-110 transition-all"
              />
            </div>
            <div className="w-full bg-slate-500 mb-2 md:mb-0 relative h-[250px] md:ml-2 group overflow-hidden ">
              <div className="h-full w-full absolute bg-black bg-opacity-60 z-20 cursor-pointer flex items-center justify-center">
                <div
                  className={`border-2 border-white w-28 md:w-48 h-10 md:h-14 rounded-sm flex justify-center items-center text-xl md:text-2xl text-white ${fonts.font_8.className} transition-all hover:scale-110`}
                >
                  read more
                </div>
              </div>
              <Image
                src={Demo5}
                alt=""
                objectFit="cover"
                layout="fill"
                className="group-hover:scale-110 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
