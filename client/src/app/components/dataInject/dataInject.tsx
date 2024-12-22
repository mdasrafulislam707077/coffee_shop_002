import { useState } from "react";
import { useSelector } from "react-redux";
import LoginAndCreateToast from "../login_and_create/toast";
import Navheader from "../nav-header/navHeader";
interface DataInjectHeader {
  onMenuClick: AnyNaptrRecord;
}
export default function DataInjectHeader(props: DataInjectHeader) {
  const [activeToast, setActiveToast] = useState(false);
  const selector = useSelector((select) => select.userInfo);
  return (
    <>
      <LoginAndCreateToast
        activeToast={activeToast}
        onCloseToast={() => {
          setActiveToast(false);
        }}
      />
      <Navheader
        onLike={() => {
          if (!(selector.email && selector.name)) {
            setActiveToast(true);
          } else {
          }
        }}
        onloginActive={() => {
          setActiveToast(true);
        }}
        onMenuClick={() => {
          if (props.onMenuClick) {
            props.onMenuClick();
          }
        }}
      />
    </>
  );
}
