import Bg from "../../assets/bg/coffee_0001.png";
import style from "./style.module.css";
// eslint-disable-next-line react/prop-types
export default function CoffeeBg({ children }) {
  return (
    <>
      <img src={Bg} className={style.contentbg} alt="" />
      <>{children}</>
    </>
  );
}
