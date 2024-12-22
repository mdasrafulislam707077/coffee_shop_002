import { tabItem } from "../../index";
import style from "./style.module.css";
// eslint-disable-next-line react/prop-types
export default function PageTab({ onClick, active }) {
  return (
    <div className={style.main}>
      <Tabbutton
        tabname="Home"
        active={active == tabItem.HOME}
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.HOME);
          }
        }}
      />
      <Tabbutton
        tabname="About-Us"
        active={active == tabItem.ABOUT}
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.ABOUT);
          }
        }}
      />
      <Tabbutton
        tabname="Service"
        active={active == tabItem.SERVICE}
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.SERVICE);
          }
        }}
      />
      <Tabbutton
        tabname="Items"
        active={active == tabItem.ITEMS}
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.ITEMS);
          }
        }}
      />
      <Tabbutton
        tabname="Blog"
        active={active == tabItem.BLOG}
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.BLOG);
          }
        }}
      />
      <Tabbutton
        active={active == tabItem.CONTACT}
        tabname="Contact"
        onClick={(name) => {
          if (onClick) {
            onClick(tabItem.CONTACT);
          }
        }}
      />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Tabbutton({ tabname = "tab-item", active = false, onClick }) {
  return (
    <div
      className={`${style.tabItems} ${active ? style.tabItemsActive : ""}`}
      onClick={() => {
        if (onClick) {
          onClick(tabname);
        }
      }}
    >
      {tabname}
    </div>
  );
}
