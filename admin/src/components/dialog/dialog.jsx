import style from "./style.module.css";
// eslint-disable-next-line react/prop-types
export default function DialogBox({ children, offCenter = false, marginTop, activeToast }) {
  return activeToast ? (
    <div
      className={`${style.main} ${offCenter ? style.centerX : style.center}`}
      style={{ paddingTop: marginTop, paddingBottom: "10px", marginBottom: "10px" }}
    >
      {children}
    </div>
  ) : null;
}
