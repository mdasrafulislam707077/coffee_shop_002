import Items from "./items";
import style from "./style.module.css";
// eslint-disable-next-line react/prop-types
export default function TabPage({ active }) {
  return (
    <div className={`${style.main}`}>
      {/* {tabItem.HOME == active ? (
        <Home />
      ) : tabItem.ABOUT == active ? (
        <AboutUs />
      ) : tabItem.BLOG == active ? (
        <Blog />
      ) : tabItem.CONTACT == active ? (
        <Contact />
      ) : tabItem.SERVICE == active ? (
        <Service />
      ) : (
        <Items />
      )} */}
      <Items />
    </div>
  );
}
