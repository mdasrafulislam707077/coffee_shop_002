import { fonts } from "../fonts/font";
import ProdectCard from "../prodectCard/card";
export default function PopulerItems() {
  return (
    <div className="max-w-[1600px] w-full relative mt-10 h-auto   m-auto">
      <div
        className={`text-2xl xl:text-3xl text-center ${fonts.font_8.className} mt-20 text-white`}
      >
        High Rate & Discount Prodect !!!
      </div>
      <div
        className={`text-3xl xl:text-7xl text-center ${fonts.font_7.className} mt-20 text-white`}
      >
        Our Popular Products
      </div>
      <div className="w-full relative mt-20  grid  grid-cols-prodect001-auto-fit gap-5 h-auto px-4">
        {[1, 2, 3, 4, 5, 1].map((element, index) => {
          return <div key={index} className=" relative"><ProdectCard marginOff widthFull  /></div>;
        })}
      </div>
      <div className="my-8 w-full relative flex justify-center items-center mb-10">
        <div
          className={`py-2 px-6 relative border border-white ${fonts.font_1.className} text-white text-sm cursor-pointer transition-all hover:scale-105`}
        >
          View More
        </div>
      </div>
    </div>
  );
}
