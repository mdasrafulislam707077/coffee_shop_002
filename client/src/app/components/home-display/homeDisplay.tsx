"use client";
import { useEffect, useState } from "react";
// import ads from '../../assets/image/patrick-tomasso-GXXYkSwndP4-unsplash.jpg'
import { fonts } from "../fonts/font";
import Navheader from "../nav-header/navHeader";
import NavMenu from "../navMenu/navMenu";
interface HomeDisplay {
  imageItem: [];
  singleContent: boolean;
  header: string;
  content: string;
  buttonName: string;
  onLike: any;
  onLogin: any;
  onCart: any;
}
export default function HomeDisplay(props: HomeDisplay): React.FC {
  const [loadItem, setLoaditem] = useState([]);
  const [currentIndex, setIndex] = useState(0);
  const [activeNav, setActiveNav] = useState(false);
  const asdasd =
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [cls, setCls] = useState({
    left: "50px",
    top: "50px",
    transitionDelay: ".2s",
  });
  function randomPosition() {
    const randomNumber = Math.random() * (100 - 50) + 50;
    return `${randomNumber}px`;
  }
  function durationTime() {
    const randomNumber = Math.random();
    return `${randomNumber}s`;
  }
  useEffect(() => {
    let trackTime = null;
    const items = [
      {
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        image:
          "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        image:
          "https://images.unsplash.com/photo-1507226983735-a838615193b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];
    setLoaditem(items);

    trackTime = setInterval(() => {
      const obj = {
        left: "50px",
        top: "50px",
        transitionDelay: ".2s",
      };

      setCls(obj);
      setTimeout(() => {
        if (currentIndex + 1 == items.length) {
          setIndex(0);
        } else {
          setIndex((s) => s + 1);
        }

        setCls(null);
      }, 1000);
    }, 20000);

    setCls(null);
    return () => clearInterval(trackTime);
  }, [currentIndex]);
  if (loadItem.length == 0) {
    return;
  }
  return (
    <div className="w-full  h-[480px]  md:h-[600px] xl:h-[1000px] grid grid-cols-8 grid-rows-8 relative">
      <NavMenu activeNav={activeNav} onClose={() => setActiveNav(false)} onLogin={()=>{
        setActiveNav(false)
        if (props.onLogin) {
          props.onLogin()
        }
      }}/>
      <div className=" h-[480px] md:h-[600px] xl:h-[1000px] w-full bg-black bg-opacity-40 absolute z-20 flex flex-col top-0 left overflow-hidden">
        <Navheader
          
          onloginActive={() => props.onLogin()}
          onLike={() =>{
            props.onLike()
            setActiveNav(false);
          }}
          onCart={() => {
            props.onCart()
            setActiveNav(false);
          }}
          onMenuClick={() => {
            setActiveNav(!activeNav);
          }}
        />
        <div className="flex-grow w-full  md:h-[94%] flex justify-center items-center relative bg-black bg-opacity-50">
          <div className="max-w-[1200px] w-full h-full  flex flex-col items-center p-[15px] sm:p-[30px] md:p-[50px] justify-center">
            <p
              className={` text-white text-center text-xl md:text-3xl xl:text-5xl ${fonts.font_3.className}`}
            >
              Lorem ipsum dolor sit amet consectetur alibero recusandae?
            </p>
            <p
              className={` text-white text-center text-base md:text-4xl xl:text-6xl mt-1 sm:mt-5 mb-3 sm:mb-5 md:mb-10 ${fonts.font_10.className}`}
            >
              Lorem ipsum dolor sit amet consectetur alibero recusandae?
            </p>
            <p
              className={` text-white text-center text-xs md:text-base  xl:text-xl  ${fonts.font_11.className}`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              eligendi. Velit necessitatibus eligendi molestias praesentium
              cupiditate, omnis, corrupti similique fugiat inventore quaerat
              incidunt natus tempore laudantium saepe ab nam nihil. Expedita hic
              omnis illum necessitatibus molestiae inventore ullam perferendis
              dignissimos aut explicabo repellat, recusandae esse. At similique
              blanditiis harum facere maxime illo ad ratione, unde ipsum!
              Provident consequuntur obcaecati consectetur?
            </p>
          </div>
        </div>
      </div>

      {new Array(8 * 8).fill("item").map((ele, index) => {
        return (
          <div key={index} className="overflow-hidden   relative flex ">
            <div
              className={`bg-fixed relative  transition-all`}
              style={{
                backgroundImage: `url(${loadItem[currentIndex].image})`,
                transition: ".2s",
                left: cls != null ? cls.left : 0,
                top: cls != null ? cls.top : 0,
                transitionDelay: ".2s",
                filter: !cls ? `blur(0px)` : `blur(15px)`,
                opacity: cls ? `0` : `1`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
