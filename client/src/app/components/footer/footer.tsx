import bg from "@/app/assets/bg/bg0011.png";
import Image from "next/image";
import { fonts } from "../fonts/font";
export default function Footer() {
  return (
    <div className="w-full relative mt-20 bg-black overflow-hidden">
      <div className="absolute h-full w-full opacity-10">
        <Image src={bg} alt="" objectFit="cover" layout="fill" />
      </div>

      <div className="max-w-[1600px] w-full m-auto h-auto  bg-opacity-10 flex justify-between   min-[1100px]:flex-row min-[1100px]:items-start flex-col  ">
        <div className=" min-[1100px]:w-[450px] h-full flex justify-center p-2">
          <div className="flex items-center flex-col w-[700px]  min-[1100px]:w-full">
            <div className="relative w-[100px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 247.659 357.323"
              >
                <path
                  id="Union_5"
                  data-name="Union 5"
                  d="M240.142,357.323,0,357.179l0-.005c.208-.176,2.165-1.756,6.746-3.048.847-.239,1.663-.45,2.427-.625,2.506-.69,5.479-1.389,8.838-2.077v-.344h1.713c3.109-.612,6.566-1.224,10.271-1.819l-.03-.541h3.438c17.823-2.841,26.625-4.6,30.286-5.387l.932-.643L64,341.037l-1.667-10.786-6-29.166L47.5,256.251l-7.834-39.667L49,210.751l9-5.5.667-1.167a6.778,6.778,0,0,0-1.2-.078c-2.213,0-7.294.552-16.468,4.245a19.615,19.615,0,0,1-7.34,1.472,18.241,18.241,0,0,1-12.232-4.775,17.571,17.571,0,0,1-5.763-10.7,19.181,19.181,0,0,1,.328-6.618,17.625,17.625,0,0,1,2.047-5.07,14.925,14.925,0,0,1,5.125-5.313c2.517-1.342,11.78-4.654,23.666-7.5,11.7-2.8,41.369-4.484,41.666-4.5v-1.833H49c-.034-.058-.809-1.435,0-5,.138-.607.227-1.187.313-1.748a13.97,13.97,0,0,1,1.454-4.824,38.557,38.557,0,0,1,6.233-8.1c1.863-1.977,5.291-3.663,10.19-5.01a95.361,95.361,0,0,1,14.456-2.573c9.659-1.07,18.434-1.083,18.521-1.083.057,0,5.751-.14,14.027-.14,20.831,0,57.081.863,65.806,6.64a23.737,23.737,0,0,1,10.5,21.833H151.333v1.833h5.333l1.5,1,18.333.875c.049,0,5.009.3,11.227,1.058,5.717.7,13.663,1.956,19.055,3.942a35.248,35.248,0,0,1,11.023,6.325,18.289,18.289,0,0,1,3.2,3.442,21.476,21.476,0,0,1,2.464,6.322,18.214,18.214,0,0,1,.308,6.335A15.968,15.968,0,0,1,221,201.608a15.4,15.4,0,0,1-7.487,5.691,22.45,22.45,0,0,1-7.771,1.288,24.44,24.44,0,0,1-4.6-.407c-.165-.051-16.431-5.145-16.857-5.429a.791.791,0,0,0-.45-.128,1.373,1.373,0,0,0-.55.128h-1.428l-.858.714v1l19,12.143-12.428,62L177.449,329.73l.306.139c-.006.009-.239.4-.535,1.017l-.935,4.722-.567,3.4a7.486,7.486,0,0,0,1.35,3.172h.074v.1a7.942,7.942,0,0,0,.968,1.046h.175v.153a9.551,9.551,0,0,0,.94.7h.488v.3c.242.14.5.275.778.413h2.938v1h10.142v.856c.421-.017.863-.039,1.312-.066,1.993-.121,4.017-.182,6.017-.182a101.356,101.356,0,0,1,17.177,1.476,100.257,100.257,0,0,1,13.338,3.247,72.143,72.143,0,0,1,11.706,4.724l4.537,1.371-7.517-.129v.131h0ZM111.8,268.35a21.945,21.945,0,0,0-7.025,4.524c-3.217,3.034-7.072,8.493-7.176,17.276s1.7,21.583,3.226,30.775c1.644,9.893,3.358,17.945,3.375,18.025l1.2,2.2,2.4,1a119.228,119.228,0,0,0,12.415.711,51.7,51.7,0,0,0,9.385-.711c3.139-.6,5.082-1.606,6.115-3.174.96-1.455,1.121-3.322,1.308-5.483.091-1.059.185-2.154.377-3.343.162-1.007.549-2.67,1.04-4.777a172.678,172.678,0,0,0,4.111-22.982c1-10.667.005-18.889-2.951-24.441-4.7-8.82-13.144-10.671-19.4-10.671A33.093,33.093,0,0,0,111.8,268.35Zm16.78-180.1c13.75-22.5,14-37,14-37s7,0,7.249,12.5-8.5,28.751-14.25,41a81.985,81.985,0,0,0-7,21.749S114.829,110.75,128.579,88.25Zm-20.75,28C99.58,104.5,98.079,96,98.079,96s-6.75-13.75,13.5-46.25S127.83,0,127.83,0s12.75,10.5,12.5,26-2,17.5-16.5,48.5-9.249,48.25-9.249,48.25.335,1.169-.18,1.169C113.824,123.919,112.187,122.455,107.83,116.25Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div
              className={`text-center text-white mt-2  text-3xl capitalize w-full ${fonts.font_7.className}`}
            >
              company name
            </div>
            <div
              className={`text-center text-white mt-2  text-sm capitalize w-full ${fonts.font_11.className}`}
            >
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium laudantium doloribus fugit labore temporibus vitae
              quas provident necessitatibus, tempore quis repellendus voluptatem
              in, libero iure minima deleniti! Quo, illo voluptates. Quasi est
              nisi, ratione in perferendis voluptate vero repudiandae omnis
              sapiente. Quibusdam quo dolor, necessitatibus, id autem veritatis
              deleniti eius illum qui ipsa ut quasi explicabo maiores architecto
              suscipit odit!{" "}
            </div>
          </div>
        </div>
        <div className="w-full min-[1100px]:w-[450px]  h-full  py-4">
        <div className="hidden  1100px:flex h-[144.27px] w-full"></div>
          <div
            className={`text-center text-3xl capitalize ${fonts.font_7.className} text-white`}
          >
            necessary link
          </div>
          <div className="w-full relative h-auto  text-center text-white">
          <div
              className={`w-full ml-2 text-center my-2 ${fonts.font_11.className} cursor-pointer hover:underline `}
            >
             FAQ
            </div>
            <div
              className={`w-full ml-2 text-center my-2 ${fonts.font_11.className} cursor-pointer hover:underline lowercase`}
            >
             SERVICES
            </div>
            <div
              className={`w-full ml-2 text-center my-2 ${fonts.font_11.className} cursor-pointer hover:underline lowercase`}
            >
              about us
            </div>
            <div
              className={`w-full ml-2 text-center my-2 ${fonts.font_11.className} cursor-pointer hover:underline lowercase`}
            >
              CONTACTS us
            </div>
          </div>
        </div>
        <div className="w-full min-[1100px]:w-[450px]  h-full py-4  text-white flex flex-col ">
          <div className="hidden  1100px:flex h-[144.27px] w-full"></div>
          <div
            className={`text-center text-3xl capitalize ${fonts.font_7.className} `}
          >
            Address & Locations
          </div>
          <div className="w-full" >
            <div className={`text-sm text w-[200px] text-center mt-5  m-auto ${fonts.font_11.className}`} >
            Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square, Dhaka 1000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
