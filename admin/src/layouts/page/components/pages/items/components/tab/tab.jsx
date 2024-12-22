import style from "./style.module.css";
export const tabItemsName = {
  TEA: "TEA",
  COFFEE: "COFFEE",
};
// eslint-disable-next-line react/prop-types
export default function ItemsTab({ active, onClick }) {
  return (
    <div className={style.main}>
      <a
        className={`${style.link} ${active == tabItemsName.TEA ? style.activelink : ""}`}
        onClick={() => {
          if (onClick) {
            onClick(tabItemsName.TEA);
          }
        }}
      >
        Tea
      </a>
      <a
        className={`${style.link} ${active == tabItemsName.COFFEE ? style.activelink : ""}`}
        onClick={() => {
          if (onClick) {
            onClick(tabItemsName.COFFEE);
          }
        }}
      >
        Coffee
      </a>
    </div>
  );
}
